const parser = require("postcss-value-parser")
const getToken = require("./getToken")
const parseTokenNode = require("./parseTokenNode")

/**
 * Parse a result string to find a token.
 *
 * @param {string} result
 *   The string to parse.
 * @param {object} tokens
 *   The object list of tokens.
 *
 * @return {string}
 *   A string suitable to replace the result.
 */
module.exports = (result, tokens) =>
  parser(result)
    .walk(node => {
      const { token, fallback } = parseTokenNode(node)
      if (token) {
        const value = getToken(token, tokens, fallback)
        node.type = "word"
        node.value = value
      }
    })
    .toString()
