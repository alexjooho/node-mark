const {Markov, MarkovMachine} = require("./markov");

describe("get chains", function(){
  test("testing get chains", function(){
    let sentence = "the the the the";

    let v1 = new MarkovMachine(sentence);
    let map2 = new Map();
    map2.set("the", ["the", "the", "the", null]);
    expect(v1.chains).toEqual(map2);
  });
})

test("testing text", function(){
  let v2 = new MarkovMachine("the cat has a hat");
  expect(v2.getText()).toEqual("the cat has a hat");
});