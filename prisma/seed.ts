import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Calçados",
        slug: "calcados",
        description: "Tênis e calçados esportivos para todos os esportes.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Calcados",
      },
      {
        name: "Roupas Masculinas",
        slug: "roupas-masculinas",
        description: "Camisetas, shorts e agasalhos masculinos.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Roupas+Masculinas",
      },
      {
        name: "Roupas Femininas",
        slug: "roupas-femininas",
        description: "Leggings, tops e jaquetas femininas.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Roupas+Femininas",
      },
      {
        name: "Tênis Masculino",
        slug: "tenis-masculino",
        description: "Tênis de corrida, treino e casual masculino.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Tenis+Masculino",
      },
      {
        name: "Tênis Feminino",
        slug: "tenis-feminino",
        description: "Tênis de corrida, treino e casual feminino.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Tenis+Feminino",
      },
      {
        name: "Meias Masculinas",
        slug: "meias-masculinas",
        description: "Meias esportivas masculinas de alto desempenho.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Meias+Masculinas",
      },
      {
        name: "Meias Femininas",
        slug: "meias-femininas",
        description: "Meias esportivas femininas confortáveis e resistentes.",
        image: "https://placehold.co/600x400/16181D/FF5A36?text=Meias+Femininas",
      },
    ],
  });

  const calcados = await prisma.category.findUnique({ where: { slug: "calcados" } });
  const roupasMasc = await prisma.category.findUnique({ where: { slug: "roupas-masculinas" } });
  const roupasFem = await prisma.category.findUnique({ where: { slug: "roupas-femininas" } });
  const tenisMasc = await prisma.category.findUnique({ where: { slug: "tenis-masculino" } });
  const tenisFem = await prisma.category.findUnique({ where: { slug: "tenis-feminino" } });
  const meiasMasc = await prisma.category.findUnique({ where: { slug: "meias-masculinas" } });
  const meiasFem = await prisma.category.findUnique({ where: { slug: "meias-femininas" } });

  const products = [
    {
      name: "NEX Runner Pro",
      slug: "nex-runner-pro",
      description: "Tênis de corrida leve e responsivo, ideal para treinos diários e longas distâncias.",
      price: 599.9,
      basePrice: 799.9,
      stock: 45,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=NEX+Runner+Pro",
        "https://placehold.co/800x800/16181D/FF5A36?text=NEX+Runner+Pro+2",
      ]),
      sizes: JSON.stringify(["38", "39", "40", "41", "42", "43", "44"]),
      colors: JSON.stringify(["Preto", "Branco", "Cinza"]),
      featured: true,
      categoryId: tenisMasc!.id,
    },
    {
      name: "NEX Runner Feminino",
      slug: "nex-runner-feminino",
      description: "Tênis de corrida feminino com amortecimento premium e design moderno.",
      price: 549.9,
      basePrice: 699.9,
      stock: 38,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=NEX+Runner+Feminino",
      ]),
      sizes: JSON.stringify(["34", "35", "36", "37", "38", "39", "40"]),
      colors: JSON.stringify(["Rosa", "Preto", "Branco"]),
      featured: true,
      categoryId: tenisFem!.id,
    },
    {
      name: "Camiseta NEX Dry Masculina",
      slug: "camiseta-nex-dry-masculina",
      description: "Camiseta de treino com tecnologia de secagem rápida e tecido leve.",
      price: 129.9,
      basePrice: 179.9,
      stock: 120,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=Camiseta+NEX+Dry",
      ]),
      sizes: JSON.stringify(["P", "M", "G", "GG", "XG"]),
      colors: JSON.stringify(["Preto", "Cinza", "Azul", "Verde Neon"]),
      featured: false,
      categoryId: roupasMasc!.id,
    },
    {
      name: "Top NEX Support Feminino",
      slug: "top-nex-support-feminino",
      description: "Top de alta sustentação para treinos intensos e corridas.",
      price: 149.9,
      basePrice: 199.9,
      stock: 85,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=Top+NEX+Support",
      ]),
      sizes: JSON.stringify(["P", "M", "G", "GG"]),
      colors: JSON.stringify(["Preto", "Rosa", "Roxo"]),
      featured: true,
      categoryId: roupasFem!.id,
    },
    {
      name: "Meia NEX Compressão Masculina",
      slug: "meia-nex-compressao-masculina",
      description: "Meia de compressão para melhorar a performance e reduzir a fadiga muscular.",
      price: 49.9,
      basePrice: 69.9,
      stock: 200,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=Meia+NEX+Compressao",
      ]),
      sizes: JSON.stringify(["38-41", "42-45"]),
      colors: JSON.stringify(["Preto", "Branco", "Cinza"]),
      featured: false,
      categoryId: meiasMasc!.id,
    },
    {
      name: "Meia NEX Invisível Feminina",
      slug: "meia-nex-invisivel-feminina",
      description: "Meia esportiva discreta e confortável para o dia a dia.",
      price: 39.9,
      basePrice: 59.9,
      stock: 180,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=Meia+NEX+Invisivel",
      ]),
      sizes: JSON.stringify(["34-37", "38-41"]),
      colors: JSON.stringify(["Preto", "Branco", "Bege"]),
      featured: false,
      categoryId: meiasFem!.id,
    },
    {
      name: "Chuteira NEX Campo",
      slug: "chuteira-nex-campo",
      description: "Chuteira de campo com travas fixas e cabedal resistente.",
      price: 399.9,
      basePrice: 499.9,
      stock: 30,
      images: JSON.stringify([
        "https://placehold.co/800x800/16181D/FF5A36?text=Chuteira+NEX+Campo",
      ]),
      sizes: JSON.stringify(["38", "39", "40", "41", "42", "43", "44"]),
      colors: JSON.stringify(["Preto/Verde", "Azul/Branco"]),
      featured: false,
      categoryId: calcados!.id,
    },
  ];

  await prisma.product.createMany({ data: products });

  console.log(`Seed concluído: ${categories.count} categorias e ${products.length} produtos criados.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
