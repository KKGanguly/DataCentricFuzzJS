# --- server.py ---
from flask import Flask, request, jsonify
import numpy as np
import shap
import joblib  # or pickle
import pandas as pd
from scipy.stats import wilcoxon

app = Flask(__name__)

# Load model and SHAP explainer
# Todo: add static model
static_model_path = "final_crash_detection_model.pkl"
combined_model_path = "final_crash_detection_model.pkl"
model = joblib.load(combined_model_path)
static_model = joblib.load(static_model_path)
submodel = model.calibrated_classifiers_[0].estimator
submodel_static = static_model.calibrated_classifiers_[0].estimator
explainer = shap.Explainer(submodel)
explainer_static = shap.Explainer(submodel_static)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        # Ensure input features are in the same order as model expects
        expected_features = model.feature_names_in_
        input_df = pd.DataFrame(
            [[data[feat] for feat in expected_features]], columns=expected_features
        )
        # Predict probability
        prob = model.predict_proba(input_df)[:, 1][0]

        return jsonify({"probability": float(prob)})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 400


def shap_by_coverage(shap_dict, coverage=0.95):
    items = sorted(shap_dict.items(), key=lambda kv: abs(kv[1]), reverse=True)
    total = sum(abs(v) for _, v in items) or 1.0
    kept, acc = [], 0.0
    for f, v in items:
        kept.append((f, v))  # keep feature and value
        acc += abs(v)
        if acc / total >= coverage:
            break
    kept_dict = dict(kept)
    kept_features = list(kept_dict.keys())
    return kept_features, kept_dict


@app.route("/predict_static", methods=["POST"])
def predict_static():
    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])

        # Predict probability
        prob = static_model.predict_proba(input_df)[:, 1][0]

        return jsonify({"probability": float(prob)})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 400


# --- New endpoint ---
@app.route("/shap", methods=["POST"])
def shap_scores():
    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])

        # Compute SHAP values
        shap_values = explainer(input_df)
        # Convert to dict: {feature_name: shap_value}
        feature_shap = {
            name: float(val)
            for name, val in zip(input_df.columns, shap_values.values[0])
        }
        _, significant_features = shap_by_coverage(feature_shap)
        print(significant_features)
        return jsonify({"shap_values": significant_features})
    except Exception as e:
        print(f"Error computing SHAP values: {e}")
        return jsonify({"error": str(e)}), 400


# --- New endpoint ---
@app.route("/shap_static", methods=["POST"])
def shap_scores_static():
    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])

        # Compute SHAP values
        shap_values = explainer_static(input_df)

        # Convert to dict: {feature_name: shap_value}
        feature_shap = {
            name: float(val)
            for name, val in zip(input_df.columns, shap_values.values[0])
        }

        return jsonify({"shap_values": feature_shap})
    except Exception as e:
        print(f"Error computing SHAP values: {e}")
        return jsonify({"error": str(e)}), 400

# --- New endpoint ---
@app.route("/feature_importance", methods=["GET"])
def feature_importance():
    """
    Return normalized XGBoost feature importance from the calibrated submodel.
    """
    try:
        # unwrap XGBoost estimator from CalibratedClassifierCV
        fm = submodel  # or submodel_static for static model
        if hasattr(fm, "base_estimator"):
            fm = fm.base_estimator  # for CalibratedClassifierCV
        if hasattr(fm, "get_booster"):  # XGBClassifier
            booster = fm.get_booster()
            # importance_type can be 'weight', 'gain', or 'cover'; gain is usually best
            score = booster.get_score(importance_type="gain")
            if not score:
                return jsonify({"error": "XGBoost returned empty importance"}), 500

            # normalize 0-1
            max_val = max(score.values())
            normalized = {k: v / max_val for k, v in score.items()}
            return jsonify({"feature_importance": normalized})

        return jsonify({"error": "submodel is not XGBoost"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True)
