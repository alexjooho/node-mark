"use strict";
/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * 
   * */

  getChains() {
    let chains = {};

    for(let i =0; i < this.words.length; i++) {
      if(i === this.words.length - 1) {
        chains[this.words[i]] ? chains[this.words[i]].push(null) : chains[this.words[i]] = [null]
      }
      else {
        chains[this.words[i]] ? chains[this.words[i]].push(this.words[i+1]) : chains[this.words[i]] = [this.words[i+1]];
      }
    }
    return chains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let text = this.words[0];
    let lastWord = this.words[0];

    while(lastWord !== null) {
      let chainLength = this.chains[lastWord].length;
      let randomIndex = Math.floor(Math.random()*chainLength);
      lastWord = this.chains[lastWord][randomIndex];
      if(lastWord !== null) {
        text += ` ${lastWord}`;
      }
    }

    return text;

  }
}

const catInHatMachine = new MarkovMachine("The cat is in the hat. The cat is the cat. The hat is a cat.");

console.log(catInHatMachine.getText());

/*
const fsp = require("fs/promises")
undefined
> async function readFile() {
... let contents = await fsp.readFile("gettysburg.txt", "utf8");
... return contents;
... }
undefined
> let test2;
undefined
> async function writeFile() {
... let content = await readFile();
... test2 = new MarkovMachine(content);
... }
undefined
> writeFile();
 */

module.exports = {MarkovMachine};