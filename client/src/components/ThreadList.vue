<template>
	<div>
		<h4>Thread List</h4>
		<div v-for="thread in thread_list" class="alert alert-primary" role="alert">
			<h5>{{ thread.title }}</h5>
			<p> {{ thread.threadContent }}</p>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		
	},
	data () {
		return {
			thread_list: []
		}
	},
	methods: {
		getThreads (callback) {
      var self = this
      this.axios.get('http://localhost:3000/api/threads')
      .then(response => {
        self.threadList = response.data
      })
      .catch(err => console.log(err))
    }
	},
	created () {
		this.getThreads()
	}
}
</script>

<style>

</style>