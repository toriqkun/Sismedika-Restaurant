<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $user->name = $request->name;

        if ($request->hasFile('avatar')) {
            if ($user->avatar_image && file_exists(public_path($user->avatar_image))) {
                unlink(public_path($user->avatar_image));
            }

            $file = $request->file('avatar');
            $filename = 'avatar-' . $user->id . '-' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/avatars'), $filename);
            $user->avatar_image = 'uploads/avatars/' . $filename;
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatarImage' => $user->avatar_image ? asset($user->avatar_image) : null,
                'role' => $user->role,
            ],
        ]);
    }
}
