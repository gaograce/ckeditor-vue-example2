<template>
  <div>
    <textarea :id='id'></textarea>
    <my-dialog ref="dialog" @content-changed="insertDiv"></my-dialog>
  </div>
</template>

<script>
  import MyDialog from './MyDialog'
  export default {
    name: 'CkEditor',
    mounted: function () {
      const self = this
      let CKEDITOR = window.CKEDITOR
      console.log(CKEDITOR)

      // 渲染编辑器
      let ckeditor = window.CKEDITOR.replace(self.id, {
        height: 500,
        language: 'en',
        //自定义插件（位于public下的ckeditor/plugins/mydialog）
        extraPlugins: 'mydialog',
        removePlugins: 'resize',
        allowedContent: true,
        pasteFilter: null,
        toolbar: [
          {
            name: 'code',
            items: ['Source']
          },
          {
            name: 'basicstyles',
            items: ['Styles', '-', 'Bold', 'Italic', 'Strike', 'Underline', 'TextColor', 'BGColor', 'Font', 'FontSize']
          },
          {
            name: 'styles',
            items: ['RemoveFormat']
          },
          {
            name: 'insert',
            items: ['MyDialog', 'Table', 'SpecialChar', 'HorizontalRule']
          },
          '/',
          {
            name: 'paragraph',
            items: ['Format', 'NumberedList', 'BulletedList', '-', 'Indent', 'Outdent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'lineheight']
          },
          {
            name: 'links',
            items: ['Link', 'Unlink', '-', 'Subscribe', 'Unsubscribe', 'HtmlTemplate']
          },
          {
            name: 'document',
            items: ['Undo', 'Redo']
          }
        ]
      })

      ckeditor.on('paste', async evt => {
        if (evt.data.dataTransfer.getFilesCount() > 0) {
          evt.data.dataValue = ''
          if (evt.data.dataTransfer.getFilesCount()) {
            let file = evt.data.dataTransfer.getFile(0)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              self.ckeditor.insertHtml(`<img src="${reader.result}"/>`)
            };
            reader.onerror = error => {
              console.error(error)
            }
          }
        }
      })
      ckeditor.on('key', function (event) {
        let keycode = event.data.keyCode
        if (keycode === 9) {
          event.cancel()
          ckeditor.execCommand('indent')
        }
      })

      ckeditor.on('instanceReady', () => {
        self.ckeditor = ckeditor
        ckeditor.dialog = self.$refs.dialog
        console.log(ckeditor)
      })

      // 监听内容变更事件
      ckeditor.on('change', function () {
        self.$emit('contentChanged', self.ckeditor.getData())
      })
      CKEDITOR.config.line_height = '1em;1.25em;1.5em;1.8em;2.0em;2.5em;3.0em;4.0em;5.0em;'
    },
    data: function () {
      return {
        id: parseInt(Math.random() * 10000).toString(),
        textarea: '',
        ckeditor: null
      }
    },
    methods: {
      insertDiv (data) {
        this.ckeditor.insertHtml(data)
      }
    },
    components: {
      MyDialog
    }
  }
</script>

<style scoped>

</style>