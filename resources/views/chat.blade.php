
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
	<style>
		.list-group{
			overflow-y:  scroll;
			height:200px;
		}
	</style>
  </head>

  <body>

  	<div class="container">
  		<div class="row" id="app">
			<div class="offset-4 col-4">
				<li class="list-group-item active">
					Chat Room
					<span class="badge badge-pill badge-danger">@{{numberOfUsers}}</span>
					
				</li>
				<div class="badge badge-pill badge-primary">@{{typing}}</div>
				<ul class="list-group " v-chat-scroll>
					
					<message v-for="value, index in chat.message" :key="value.index" :color='chat.color[index]' :user="chat.user[index]" :time="chat.time[index]">
						@{{ value}}
					</message>

					
				</ul>
				<input type="text" placeholder="Enter you message Here" class="form-control" name="" v-model="message" @keyup.enter="send">
				<br>
				<span class="btn btn-warning btn-sm" @click.prevent="deleteSession">Delete Chat</span>
			</div>
  			
  		</div>
  	</div>


    <script src="{{ asset('js/app.js') }}"></script>
  </body>
</html>
