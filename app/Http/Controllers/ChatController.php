<?php

namespace App\Http\Controllers;

use App\Events\ChatEvent;
use Illuminate\Http\Request;
use App\User;

class ChatController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }
    public function chat(){
        return view('chat');
    }

    public function send(Request $request){

        $user = User::find(Auth::id());
        event(new ChatEvent($request->message, $user));
    }
}
