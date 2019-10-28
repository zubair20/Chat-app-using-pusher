
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
				<li class="list-group-item active">Chat Room</li>
				<ul class="list-group ">
					
					<message v-for="value in chat.message">
						@{{ value}}
					</message>

					
				</ul>
				<input type="text" placeholder="Enter you message Here" class="form-control" name="" v-model="message" @keyup.enter="send">
			</div>
  			
  		</div>
  	</div>


    <script src="{{ asset('js/app.js') }}"></script>
  </body>
</html>
