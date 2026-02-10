<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Toriq Abdul Rosyid',
            'email' => 'toriq@mail.com',
            'password' => Hash::make('12345678'),
            'role' => 'pelayan',
        ]);

        User::create([
            'name' => 'Sismedika',
            'email' => 'sismedika@mail.com',
            'password' => Hash::make('12345678'),
            'role' => 'kasir',
        ]);
    }
}
