<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddMoreTablesSeeder extends Seeder
{
    public function run(): void
    {
        $existingCount = DB::table('tables')->count();

        for ($i = $existingCount + 1; $i <= 24; $i++) {
            DB::table('tables')->insert([
                'table_number' => 'Meja ' . $i,
                'status' => 'available',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
