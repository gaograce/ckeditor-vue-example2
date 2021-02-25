CKEDITOR.plugins.add('mydialog', {
  icons: 'mydialog',
  init: function (editor) {
    editor.addCommand('mydialog', {
      exec: function (editor) {
        editor.dialog.show()
      }
    })
    editor.ui.addButton('MyDialog', {
      label: 'Open My Dialog',
      command: 'mydialog'
    })
  }
})