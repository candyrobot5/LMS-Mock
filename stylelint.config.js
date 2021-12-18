module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['export'] }
    ],
    'property-no-unknown': [
      false,
      { ignoreProperties: ['/^app/', '/^sidebar/', '/^chart/'] }
    ],
    'comment-empty-line-before': [false],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['FontAwesome', 'Font Awesome 5 Free']
      }
    ]
  }
}
