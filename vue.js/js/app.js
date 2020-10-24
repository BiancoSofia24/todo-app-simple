const app = new Vue({
  el: '#app',
  data: {
    title: 'Mis Tareitas. Vue',
    tasks: [],
    newTask: ''
  },

  methods: {
    addTask: function(e) {
      e.preventDefault();

      this.tasks.push({
        name: this.newTask,
        state: false
      });

      this.newTask = '';
      localStorage.setItem('tasks-vue', JSON.stringify(this.tasks));
    },

    editTask: function(index) {
      this.tasks[index].state = true;
      localStorage.setItem('tasks-vue', JSON.stringify(this.tasks));
    },

    deleteTask: function(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks-vue', JSON.stringify(this.tasks));
    }
  },

  created: function() {
    let dataDB = JSON.parse(localStorage.getItem('tasks-vue'));

    if (dataDB === null) {
      this.tasks = [];
    } else {
      this.tasks = dataDB;
    }
  }
});