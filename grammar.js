module.exports = grammar({
  name: 'PRISM_model_checking',

  extras: $ => [$.comment, /\s/],

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.model_checker_definition,
      $.global_definition,
      $.module_definition,
      $.rewards_definition,
      $.formula_definition,
    ),

    model_checker_definition: $ => choice(
      "dtmc",
      "ctmc",
    ),

    global_definition: $ => choice(
      $.global_constant_definition,
      $.global_variable_definition,
    ),

    global_constant_definition: $ => seq(
      'const',
      $.primitive_type,
      $.assignment_expression,
      ';',
    ),

    global_variable_definition: $ => seq(
      'global',
      $.variable_declaration_expression,
      ';',
    ),

    module_definition: $ => seq(
      'module',
      $.identifier,
      repeat($._expression),
      'endmodule',
    ),

    rewards_definition: $ => seq(
      'rewards',
      $.string_type,
      repeat($._expression),
      'endrewards',
    ),

    formula_definition: $ => seq(
      'formula',
      $.assignment_statement,
    ),

    parameter_list: $ => seq(
      '(',
       // TODO: parameters
      ')'
    ),

    _type: $ => choice(
      $.primitive_type,
      $.string_type,
    ),

    primitive_type: $ => choice(
      'bool',
      'int',
    ),

    string_type: $ => seq(
      '"',
      $.text,
      '"',
    ),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}'
    ),

    _statement: $ => choice(
      $.return_statement,
      // TODO: other kinds of statements
      $.assignment_statement,
    ),

    return_statement: $ => seq(
      'return',
      $._expression,
      ';'
    ),

    assignment_statement: $ => seq(
      // TODO:
      $.assignment_expression,
      ';',
    ),

    _expression: $ => choice(
      $.identifier,
      $.number,
      // TODO: other kinds of expressions
      $.assignment_expression,
      $.variable_declaration_expression,
    ),

    assignment_expression: $ => seq(
      $.identifier,
      '=',
      $._expression,
    ),

    variable_declaration_expression: $ => seq(
      $.identifier,
      ':',
      '[',
      $._expression,
      '..',
      $._expression,
      ']',
      'init',
      $._expression
    ),

    identifier: $ => /[A-Z|a-z|_]+\w*/,

    number: $ => /\d+/,

    text: $ => /[A-Z|a-z|_]\w+/,

    comment: $ => /\/\/.*/,

  }
});
