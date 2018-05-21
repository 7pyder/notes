<template>
  <div class="folders" v-bind:class="{visible: toggle}">
    <header><i class="fa fa-bars menu" aria-hidden="true" @click="toggleMenu"></i></header>
    <div style="display: flex">
      <form class="card" @submit.prevent="add">
        <input type="text" v-model="folderName" placeholder="New folder..." class="folder">
        <button type="submit" hidden>Create folder</button>
      </form>
    </div>
    <router-link to="/notes" class="folder-link">
      <input type="text" value="Home" class="folder-name">
    </router-link>
    <router-link :to="'/notes?folder=' + folder._id" v-for="(folder,index) in folders" :key="index" class="folder-link">
      <input type="text" :value="folder.name" class="folder-name" @blur="rename($event, folder._id)">
      <i class="fa fa-pencil" aria-hidden="true" @click="focus"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Folders',
  data () {
    return {
      folders: [],
      folderName: '',
      toggle: false
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    get () {
      this.$http.get('/folders/get')
        .then(res => this.folders = res.data)
        .catch(err => console.error(err))
    },
    add () {
      if (!this.folderName.trim()) {
        return
      }
      let data = {name: this.folderName}
      this.$http.post('/folders/add', data)
        .then(res => {
          data._id = res.data._id
          this.folders.unshift(data)
        })
        .catch(err => console.error(err))
    },
    rename (event, _id) {
      this.$http.put('/folders/edit', {
        _id,
        name: event.target.value
      })
        .then(res => console.log('folder renamed'))
        .catch(err => console.error('rename failed'))
    },
    sync (event) {
      this.note.text = event.target.innerText
    },
    focus (event) {
      event.target.previousElementSibling.focus()
    },
    toggleMenu () {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style scoped>
.card {
  flex: 240px 1 1;
}
.folders {
  overflow: auto;
  padding-bottom: 16px;
  position: fixed;
  z-index: 1;
  background: #fff;
  bottom: 0;
  top: 44px;
}
.folders.visible {
  left: 0;
}
.folder-name {
  pointer-events: none;
  font: inherit;
  background: inherit;
}
.folder-link {
  display: block;
  padding: 8px 16px;
  margin: 2px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
}
.folder-link:hover, .folder-link.router-link-exact-active {
  background-color: #eee;
}
.fa-pencil {
  padding: 8px;
}
header {
  background-color: #eee;
  padding: 2px 8px;
  font-size: 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 44px;
}
.menu {
  padding: 8px;
  display: none;
}
@media (max-width: 767px) {
  .menu {
    display: inline-block;
  }
  .folders {
    left: -320px;
    transition: left 0.4s;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
  }
}
</style>