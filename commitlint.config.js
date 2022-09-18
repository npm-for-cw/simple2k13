module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'test',
        'docs',
        'info',
        'format',
        'merge',
        'depend',
        'del',
        'build',
        'ci'
      ]
    ],
    'subject-valid': [1, 'always']
  },
  plugins: [
    {
      rules: {
        'subject-valid'({ subject }) {
          console.log('it is a subject', subject)
          return [
            /^[\s\S]+?(issue\s+#\d+)$/i.test(subject),
            'commit-msg should end with (issue #{issueId})'
          ]
        }
      }
    }
  ]
}
