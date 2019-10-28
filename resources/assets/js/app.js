
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, { timeout: 5000 })

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('message', require('./components/Message.vue'));

const app = new Vue({
    el: '#app',

    data:{
    	message: '',
    	chat: {
			message:[],
			user:[],
			color:[],
			time:[]
		},
		typing:'',
		numberOfUsers:0
	},
	
	watch:{

		message(){

			Echo.private('chat')
				.whisper('typing', {
					name: this.message
				});
		}
	},

    methods:{

    	send(){

    		if (this.message.length != 0) {
    			
				this.chat.message.push(this.message);
				this.chat.time.push(this.getTime());
				this.chat.color.push('success');
				this.chat.user.push('You');
				
				axios.post('/send', {
					message: this.message,
					chat: this.chat
					
				})
				.then(response => {
					console.log(response);
					
				})
				.catch(error => {
					console.log(error);
				});
				this.message = '';
    		}
		},
		
		getTime(){

			let time = new Date();
			return time.getHours()+':'+time.getMinutes();
		},

		getOldMessages(){

			axios.post('/getOldMessage')
			.then(response => {
				
				if (response.data != '') {
					this.chat = response.data
				}

			})
			.catch(error => {
				console.log(error);
			});

		},

		deleteSession(){
			axios.post('/deleteSession')
			.then(response => {
				this.$toaster.success('History Deleted Successfully')
			});
		}
	},
	mounted(){
		this.getOldMessages();

		Echo.private('chat')
			.listen('ChatEvent', (e) => {
				this.chat.message.push(e.message);
				this.chat.time.push(this.getTime());
				this.chat.color.push('warning');
				this.chat.user.push(e.user);

				axios.post('/saveToSession',{ chat:this.chat})
				.then(response => {

					if (response.data != '') {
						this.chat = response.data
					}

				})
				.catch(error => {
					console.log(error);
				});
			})
			.listenForWhisper('typing', (e) => {
				if (e.name != '') {
					this.typing = 'typing...'
				}else{
					this.typing = ''
				}
			});

		Echo.join(`chat`)
			.here((users) => {
				this.numberOfUsers = users.length
			})
			.joining((user) => {
				this.numberOfUsers += 1
				this.$toaster.success(user.name+' Joined the Chat Room')
			})
			.leaving((user) => {
				this.numberOfUsers -= 1
				this.$toaster.warning(user.name + ' left the Chat Room')
			});
	}
});
