/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `Order` table. All the data in the column will be lost.
  - Added the required column `items` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
DROP COLUMN "products",
ADD COLUMN     "items" JSONB NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending';
