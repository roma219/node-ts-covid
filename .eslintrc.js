module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'plugin:node/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'node/no-unsupported-features/es-syntax': ["error", { "ignores": ["modules"] }],
    "node/no-missing-import": ["error", {
      "allowModules": [],
      "resolvePaths": ["node_mofules", 'src/', ''],
      "tryExtensions": [".js", ".json", ".node", ".ts"]
    }]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
      }
    }
  ]
}
