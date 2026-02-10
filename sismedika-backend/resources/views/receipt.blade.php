<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Receipt A4</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        body {
            font-family: monospace;
        }

        /* Ukuran A4 */
        .a4 {
            width: 210mm;
            min-height: 297mm;
        }

        @media print {
            body {
                background: white;
                margin: 0;
                padding: 0;
            }

            .a4 {
                box-shadow: none !important;
                margin: 0;
            }
        }

        /* Fake barcode */
        .barcode {
            display: flex;
            justify-content: center;
            gap: 2px;
        }

        .barcode span {
            width: 2px;
            background: black;
        }
    </style>
</head>
<body class="bg-gray-300 p-6">

<!-- A4 Container -->
<div class="a4 mx-auto bg-white p-8 shadow-lg">

    <!-- Logo -->
    <div class="text-center mb-6">
        <img src="{{ asset('images/sismedika.jpeg') }}" class="mx-auto h-20 mb-3">
        <p class="text-sm">Jl. Contoh Alamat No. 10</p>
        <p class="text-sm">Telp. 0812-1234-5678</p>
    </div>

    <div class="text-center text-sm mb-6">
        <div>**************************************************</div>
        <div class="font-bold tracking-widest text-lg">CASH RECEIPT</div>
        <div>**************************************************</div>
    </div>

    <!-- Info -->
    <div class="text-sm mb-4 space-y-1">
        <div class="flex justify-between">
            <span>Order</span>
            <span>#{{ $order->id }}</span>
        </div>
        <div class="flex justify-between">
            <span>Table</span>
            <span>{{ $order->table->table_number }}</span>
        </div>
        <div class="flex justify-between">
            <span>Date</span>
            <span>{{ $order->created_at->format('d/m/Y H:i') }}</span>
        </div>
    </div>

    <div class="border-t border-dashed border-black my-4"></div>

    <!-- Items -->
    <table class="w-full text-sm">
        <thead>
            <tr class="border-b border-black">
                <th class="text-left py-2">Item</th>
                <th class="text-center py-2 w-20">Qty</th>
                <th class="text-right py-2 w-32">Price</th>
                <th class="text-right py-2 w-32">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($order->items as $item)
            <tr>
                <td class="py-2">{{ $item->food->name }}</td>
                <td class="text-center">{{ $item->qty }}</td>
                <td class="text-right">{{ number_format($item->price) }}</td>
                <td class="text-right">
                    {{ number_format($item->qty * $item->price) }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="border-t border-dashed border-black my-4"></div>

    <!-- Subtotal -->
    <div class="flex justify-between text-lg font-bold">
        <span>SUBTOTAL</span>
        <span>Rp {{ number_format($order->total_price) }}</span>
    </div>

    <div class="border-t border-dashed border-black my-6"></div>

    <!-- Footer -->
    <div class="text-center text-sm mt-6">
        <p class="font-bold tracking-widest">TERIMA KASIH</p>
        <p>Selamat Menikmati 🙏</p>
    </div>

    <!-- Barcode -->
    <div class="barcode mt-8">
        @for ($i = 0; $i < 60; $i++)
            <span style="height: {{ rand(40,60) }}px"></span>
        @endfor
    </div>

</div>

</body>
</html>
