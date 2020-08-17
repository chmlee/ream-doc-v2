<template>
  <div class="editor-container">
    <div class="show-button-container">
      <button @click="show = !show" class="toggle-button editor-button">{{ toggleMessage }}</button>
    </div>
    <div class=editor-lite v-if="show">
      <div class="col input-container" @keydown.ctrl.enter="compile">
        <textarea
          class="input-textarea"
          v-model="input"
          name="input"
          wrap="soft"
        >
        </textarea>
        <div class="input-panel">
          <button
            @click="reset"
            class="reset-button editor-button"
          >Reset</button>
          <button
            @click="compile"
            class="compile-button editor-button"
          >Compile Dataset</button>
        </div>
      </div>
      <div class="col output-container">
        <pre class="test">
{{ output }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { MdFile } from './markdata/markdata.min.js'
import demo from './markdata/demo/demo.js'

export default {
  props: [
    'item',
    'showDefault'
  ],
  data () {
    return {
      show: false,
      input: '',
      output: ''
    }
  },
  mounted () {
    this.input = demo[this.item]
    this.show = this.showDefault
  },
  methods: {
    reset: function () {
      this.input = demo[this.item]
    },
    compile: function() {
      const mdFile = new MdFile(this.input)
      this.output = mdFile.toCSV()
    }
  },
  computed: {
    toggleMessage: function() {
      if (this.show) {
        return 'Hide Editor'
      } else {
        this.output = ''
        return 'Try it!'
      }
    }
  }
}
</script>

<style scoped>

.show-button-container {
  margin-bottom: 10px;
  margin-left: 5px;
}

.editor-container {
  font-size: 15px;
}

.editor-lite {
  width: 100%;
  display: flex;
  height: 300px;
}

.col {
  display: flex;
  flex-direction: column;
  margin: 5px;
  width: 50%;
}

.input-container {
  display: flex;
  height: 450px;
}

.input-textarea {
  width: 100%;
  height: 200px;
}

.input-panel {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.editor-button {
  height: 30px;
}

.toggle-button {
  background: lightblue;
  width: 100px;
}

.compile-button {
  background: lightgreen;
  margin-left: 5px;
}

.reset-button {
  background: red;
}

.output-container {
  height: 200px;
}

pre {
  background: white;
  margin: 0;
  padding: 0;
  display: block;
  border-radius: 0;
  height: 200px;
  border-style: solid;
  border-width: thin;
  padding-left: 7px;
  width: 100%;
}

textarea {
  resize: none;
  font-size: inherit;
  overflow: scroll;
}


@media screen and (max-width: 800px) {
  .editor-lite {
    flex-direction: column;
    height: 500px;
  }

  .col {
    width: 100%;
  }

  .output-container {
    height: 200px;
  }

  pre {
    height: 200px;
  }

}
</style>
