<template>
  <form class="card" tabindex="1" v-bind:class="{addForm: create}">
    <input type="text" v-model="note.title" placeholder="Title" @blur="save" class="title">
    <div class="note-text-box">
      <textarea v-model.trim="note.text" placeholder="Take a note..." @blur="save" class="note-text"></textarea>
      <pre v-html="parsedText" class="note-text" @click="focus"></pre>
    </div>
    <div class="btns">
      <button type="button" v-if="create" v-show="validForm" @click="add">Add</button>
      <!-- <button type="button" v-else @click="save">Save</button> -->
      <span v-show="!create && linkCopied">Link copied!</span>
      <button type="button" v-if="!create" @click="copyLink"><i class="fa fa-link" aria-hidden="true"></i></button>
      <router-link :to="'/notes?id=' + note._id"></router-link>
      <input class="hidden" :value="noteUrl">
    </div>
  </form>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: Object,
    create: Boolean
  },
  data () {
    return {
      linkCopied: false
    }
  },
  computed: {
    parsedText () {
      let regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/g
      if (!this.note.text || !this.note.text.trim()) {
        return this.note.text
      }
      return this.note.text.replace(regex, ($1) => {
        if (/\.(jpeg|jpg|gif|png)($|\?|\s)/.test($1)) {
          return `<img src='${$1}' class='embed-img'>`
        } else {
          return `<a target='_blank' href='${$1}'>${$1}</a>`
        }
      })
    },
    validForm () {
      return (this.note.title.trim() || this.note.text.trim())
    },
    noteUrl () {
      return window.location.hostname + '/#/notes?id=' + this.note._id
    }
  },
  methods: {
    copyLink (event) {
      this.linkCopied = false
      let link = event.currentTarget.nextElementSibling
      let input = link.nextElementSibling
      input.value = link.href
      input.select()
      document.execCommand("copy")
      this.linkCopied = true
      setTimeout(() => {
        this.linkCopied = false
      }, 4000)
    },
    add () {
      if (!(this.note.title.trim() || this.note.text.trim())) {
        return
      }
      let {title, text} = this.note
      let data = {title, text}
      data.folder = this.$route.query.folder
      this.$http.post('/notes/add', data)
        .then(res => {
          this.note.title = this.note.text = ''
          data._id = res.data._id
          this.$emit('newNote', data)
        })
        .catch(err => console.error(err))
    },
    save () {
      this.$http.put('/notes/edit', this.note)
        .then(res => console.log('note updated'))
        .catch(err => console.error('update failed'))
    },
    focus (event) {
      event.target.previousElementSibling.focus()
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 16px;
  font-weight: bold;
}
.note-text-box {
  display: grid;
}
textarea.note-text {
  /* background: transparent; */
  color: transparent;
  resize: none;
  overflow: hidden;
  /* visibility: hidden; */
}
textarea.note-text:focus {
  position: relative;
  z-index: 1;
  visibility: visible;
  color: inherit;
}
.note-text {
  resize: none;
  font: inherit;
  padding: 8px;
  grid-area: 1/1/2/2;
  margin: 0;
  /* position: absolute;
  top: 0;
  left: 0; */
  white-space: pre-wrap;
  word-break: break-word;
}
.btns {
  margin-top: 4px;
  text-align: right;
}
.hidden {
  opacity: 0;
  position: absolute;
  z-index: -1;
  right: 0;
  bottom: 0;
}
.card {
  flex: 240px 0 1;
}
</style>
