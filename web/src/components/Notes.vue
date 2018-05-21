<template>
  <main>
    <div class="notes-page">
      <Folders/>
      <div style="text-align: center">
        <div style="display: flex">
          <Note :create="true" :note="note" @newNote="newNote"/>
        </div>
        <div class="notes-list">
          <Note v-for="(note, index) in notes" v-bind:key="index" :note="note"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Folders from './Folders.vue'
import Note from './Note'

export default {
  name: 'Notes',
  components: {
    Folders,
    Note
  },
  data () {
    return {
      notes: [],
      note: {
        title: '',
        text: '',
      },
      id: '',
      folder: ''
    }
  },
  mounted () {
    this.update()
  },
  watch: {
    '$route': 'update'
  },
  methods: {
    getNotes () {
      let url = '/notes/get/'
      if (this.id.trim()) {
        url += '?_id=' + this.id
      }
      if (this.folder.trim()) {
        url += '?folder=' + this.folder
      }
      this.$http.get(url)
        .then(res => this.notes = res.data)
        .catch(err => console.error(err))
    },
    update () {
      this.id = this.$route.query.id || ''
      this.folder = this.$route.query.folder || ''
      this.getNotes()
    },
    newNote (note) {
      this.notes.unshift(note)
    }
  }
}
</script>

<style scoped>
.notes-page {
  display: grid;
}
.notes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
@media (min-width: 768px) {
  .notes-page {
    padding-left: 320px;
  }
}
</style>
