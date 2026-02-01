// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Foundation

/// The core fuzzer responsible for generating and executing programs.
public class MutationEngine: FuzzEngine {
    // The number of consecutive mutations to apply to a sample.
    private let numConsecutiveMutations: Int
    private let randomMode: Bool = false

    public init(numConsecutiveMutations: Int) {
        self.numConsecutiveMutations = numConsecutiveMutations
        super.init(name: "MutationEngine")
    }
   
    public override func fuzzOne(_ group: DispatchGroup) {
        //// Run crash-predictor script and return score
       
        var parent = fuzzer.corpus.randomElementForMutating()
        var unprocessed_parent = parent
        parent = prepareForMutating(parent)
        var sortedMutators: WeightedList<Mutator> = fuzzer.mutators
        var mutatorWeights: [Mutator : Int] = [:]
        if randomMode{
            let randomWeights : [Int] = (0...fuzzer.mutators.count).map { _ in Int.random(in: 0...fuzzer.mutators.count) }.sorted(by: <)
            var sortedMutators: WeightedList<IndexingIterator<Array<Mutator>>.Element> = WeightedList(zip(fuzzer.mutators, randomWeights).map {($0, $1)})
            let mutatorWeights: [IndexingIterator<Array<Mutator>>.Element : Int] = Dictionary(uniqueKeysWithValues: zip(fuzzer.mutators, randomWeights))
        }

      

        for _ in 0..<numConsecutiveMutations {
            // TODO: factor out code shared with the HybridEngine?
            var mutator = sortedMutators.randomElement()
            
            
            let maxAttempts = 10
            var mutatedPrograms: [Program] = []
            for _ in 0..<maxAttempts {
                if let result = mutator.mutate(parent, for: fuzzer) {
                    // Success!
                    result.contributors.formUnion(parent.contributors)
                    mutator.addedInstructions(result.size - parent.size)
                    mutatedPrograms.append(result)
                    break
                    // Continue trying for more successful mutations
                } else {
                    // Try a different mutator.
                    mutator.failedToGenerate()
                    mutator = fuzzer.mutators.randomElement()
                }
            }
            // Use the last successful mutated program, if any
            let mutatedProgram = mutatedPrograms.last
           
            guard let program = mutatedProgram else {
                logger.warning("Could not mutate sample, giving up. Sample:\n\(FuzzILLifter().lift(parent))")
                continue
            }
            let explorationChance = 1.0// 10% chance to allow non-preserving mutation

            if Double.random(in: 0.0...1.0) < explorationChance {
                assert(program !== parent)
                allowExploration = true
               
            }
            else {
                assert(program !== parent)
                allowExploration = false
                
               
            }
            let outcome = execute(program, parent: unprocessed_parent)
            
            if added == true {
                if .succeeded == outcome {
                        parent = program
                }
            }
        }
    }

    /// Pre-processing of programs to facilitate mutations on them.
    private func prepareForMutating(_ program: Program) -> Program {
        let b = fuzzer.makeBuilder()
        b.buildPrefix()
        b.append(program)
        return b.finalize()
    }
}
