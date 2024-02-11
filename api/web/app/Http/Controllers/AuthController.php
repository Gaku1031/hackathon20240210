<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use App\Models\User;

class AuthController extends Controller
{
    // ユーザー登録
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'generation' => $request->generation,
        ]);
        $json = [
            'data' => $user,
        ];
        return response()->json($json, Response::HTTP_OK);
    }

    // ログイン
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::whereEmail($request->email)->first();
            $user->is_present = true;
            $user->save();
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;

            // ユーザー情報とトークンを返す
            return response()->json([
                'token' => $token,
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'generation' => $user->generation,
                'is_present' => $user->is_present,
            ], Response::HTTP_OK);
        }
        return response()->json(['message' => 'ログインに失敗しました'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
