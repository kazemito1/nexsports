import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const img = (slug: string) => JSON.stringify([`/products/${slug}.png`]);

const descriptions: Record<string, string> = {
  "nex-runner-pro": "Tênis de corrida premium com amortecimento responsivo, cabedal em mesh respirável e solado de alta tração. Ideal para treinos diários e provas de longa distância.",
  "nex-runner-feminino": "Tênis de corrida desenvolvido para a biomecânica feminina. Leve, estável e com espuma de retorno de energia para máxima performance.",
  "chuteira-nex-campo": "Chuteira de campo profissional com travas estratégicas para gramados naturais. Cabedal em material sintético premium com toque de bola aprimorado.",
  "chuteira-nex-futsal": "Chuteira de futsal com solado de borracha antiderrapante e cabedal reforçado. Máxima aderência em quadras indoor.",
  "tenis-nex-basquete": "Tênis de basquete de cano médio com suporte lateral reforçado e amortecimento de impacto para saltos e mudanças de direção.",
  "tenis-nex-trail": "Tênis de trail running com solado agressivo para terrenos irregulares, proteção contra pedras e cabedal resistente à água.",
  "tenis-nex-court": "Tênis de quadra versátil para tênis, padel e esportes indoor. Estabilidade lateral e durabilidade em solado.",
  "chinelo-nex-slide": "Chinelo slide com palmilha anatômica macia e tira ajustável. Conforto para o pós-treino e uso casual.",
  "tenis-nex-training": "Tênis de treino multiuso para academia. Base estável para levantamento e flexibilidade para exercícios dinâmicos.",
  "tenis-nex-casual-masc": "Tênis casual masculino de cano baixo com design versátil. Combina estilo esportivo com o dia a dia.",
  "tenis-nex-volley": "Tênis de vôlei com amortecimento frontal para saltos e solado de borracha com grip superior em quadra.",
  "camiseta-nex-dry-masculina": "Camiseta de treino masculina com tecnologia dry-fit que afasta o suor da pele. Tecido leve e respirável para alta intensidade.",
  "camiseta-nex-basquete": "Regata jersey de basquete masculina com tecido mesh ventilado e caimento amplo para liberdade total de movimento.",
  "bermuda-nex-training-masc": "Bermuda de treino masculina com tecido elástico, bolsos com zíper e cós anatômico. Do treino ao casual.",
  "moletom-nex-essentials-masc": "Moletom masculino com capuz, tecido felpado macio e modelagem confortável. Essencial para os dias frios.",
  "regata-nex-running-masc": "Regata de corrida masculina ultraleve com recortes de ventilação estratégicos e tecido de secagem rápida.",
  "jaqueta-nex-corta-vento": "Jaqueta corta-vento masculina com capuz, resistente à água e compactável. Proteção leve para treinos ao ar livre.",
  "calca-nex-jogger-masc": "Calça jogger masculina em moletom premium com punhos ajustados e bolsos funcionais. Estilo athleisure moderno.",
  "camiseta-nex-compressao-masc": "Camiseta de compressão masculina de manga longa. Suporte muscular, proteção UV e segunda pele para treinos intensos.",
  "camisa-nex-polo": "Camisa polo masculina esportiva em piquet respirável. Visual clean que transita do trabalho ao lazer.",
  "top-nex-support-feminino": "Top de alta sustentação com tecido compressivo e respirável. Perfeito para corrida, crossfit e treinos de alto impacto.",
  "legging-nex-power": "Legging de cintura alta com compressão modeladora e tecido opaco. Bolso lateral para celular e cós que não escorrega.",
  "camiseta-nex-cropped": "Cropped de treino feminino com caimento solto e tecido dry-fit leve. Estilo e conforto para qualquer atividade.",
  "saia-nex-sport": "Saia esportiva com short interno integrado. Ideal para tênis, corrida e treinos com total segurança e movimento.",
  "macacao-nex-yoga": "Macacão de yoga feminino com modelagem justa e tecido com elasticidade em 4 direções. Conforto absoluto na prática.",
  "jaqueta-nex-windbreaker-fem": "Jaqueta windbreaker feminina leve com capuz e tecido repelente à água. Camada perfeita para dias de vento.",
  "shorts-nex-run-fem": "Shorts de corrida feminino leve com short interno e cós largo confortável. Liberdade em cada passada.",
  "regata-nex-seamless": "Regata seamless feminina sem costuras com tecido de alta elasticidade. Zero atrito, máximo conforto.",
  "moletom-nex-crop-fem": "Moletom cropped feminino com capuz e tecido felpado premium. Tendência athleisure para o dia a dia.",
  "tenis-nex-ghost": "Tênis de corrida neutro ultraleve com espuma responsiva de última geração. Sensação de correr nas nuvens.",
  "tenis-nex-velocity": "Tênis de velocidade com placa de propulsão para provas e treinos de tiro. Máximo retorno de energia.",
  "tenis-nex-stability": "Tênis com suporte de estabilidade para pisada pronada. Correção de movimento sem abrir mão do conforto.",
  "tenis-nex-skate": "Tênis de skate com solado vulcanizado, camurça resistente e palmilha de impacto. Durabilidade para o rolê diário.",
  "tenis-nex-urban": "Tênis lifestyle urbano com design minimalista e conforto o dia todo. O coringa do seu guarda-roupa.",
  "tenis-nex-offroad": "Tênis de trilha com cabedal reforçado, solado com cravas multidirecionais e proteção impermeável.",
  "tenis-nex-hybrid": "Tênis híbrido treino e corrida. Transição perfeita entre a academia e a rua com estabilidade e amortecimento.",
  "tenis-nex-clay": "Tênis de tênis para quadras de saibro com solado espinha de peixe. Tração ideal e deslize controlado.",
  "meia-nex-compressao-masculina": "Meia de compressão esportiva com tecnologia de suporte ao arco do pé e ventilação estratégica. Ideal para corrida e treinos intensos.",
  "meia-nex-performance": "Meia de corrida cano alto com compressão graduada e reforço em pontos de impacto. Performance em cada quilômetro.",
  "meia-nex-training-masc": "Meia de treino cano médio com ajuste anatômico e tecido respirável. Conforto para todas as modalidades.",
  "meia-nex-trail": "Meia de trail cano alto com lã técnica, proteção contra atrito e secagem rápida para longas distâncias.",
  "meia-nex-basket": "Meia de basquete cano longo com amortecimento extra e faixa de suporte no tornozelo.",
  "meia-nex-casual": "Meia casual cano baixo em algodão premium para uso diário. Kit essencial do dia a dia.",
  "meia-nex-soccer": "Meião de futebol com compressão na canela e fixação para caneleira. Performance em campo.",
  "meia-nex-everyday": "Meia esportiva básica cano médio em algodão respirável. Conforto e durabilidade para todos os dias.",
  "meia-nex-cycling": "Meia de ciclismo com tecido aerodinâmico e compressão leve para pedais longos.",
  "meia-nex-invisivel-feminina": "Kit meias invisíveis com silicone antiderrapante no calcanhar. Discretas, confortáveis e perfeitas para o dia a dia.",
  "meia-nex-running-fem": "Meia de corrida feminina cano alto com compressão graduada e ventilação estratégica.",
  "meia-nex-training-fem": "Meia de treino feminina cano médio com ajuste anatômico e tecido macio respirável.",
  "meia-nex-yoga": "Meia de yoga e pilates com grip antiderrapante na sola e dedos separados. Adesão total ao solo.",
  "meia-nex-casual-fem": "Meia casual feminina cano baixo em algodão premium. Conforto discreto para o cotidiano.",
  "meia-nex-sport-fem": "Meia esportiva feminina cano médio com faixa de suporte no arco e toque macio.",
  "meia-nex-fitness": "Meia fitness cano médio com amortecimento leve e respirabilidade para treinos na academia.",
  "meia-nex-dance": "Meia de dança com elasticidade suave e ajuste confortável para ensaios e apresentações.",
  "meia-nex-everyday-fem": "Meia básica feminina cano médio em algodão respirável para todos os dias.",
  "tenis-nex-trail-masc": "Tênis de trail running masculino com solado agressivo para terrenos irregulares, proteção contra pedras e cabedal resistente à água.",
  "tenis-nex-training-masc": "Tênis de treino masculino multiuso para academia. Base estável para levantamento e flexibilidade para exercícios dinâmicos.",
  "bermuda-nex-moletom": "Bermuda de moletom masculina com cordão ajustável e bolsos laterais. Conforto total para descanso e treinos leves.",
  "camiseta-nex-oversized-masc": "Camiseta oversized masculina com modelagem ampla e tecido pesado premium. Estilo street esportivo.",
  "shorts-nex-ciclista": "Shorts ciclista feminino de cintura alta com compressão modeladora. Ideal para treinos e looks athleisure.",
  "camiseta-nex-oversized-fem": "Camiseta oversized feminina leve com caimento moderno. Versátil do treino ao casual.",
  "tenis-nex-knit": "Tênis masculino em knit respirável com solado macio. Conforto o dia todo com visual moderno.",
  "tenis-nex-daily": "Tênis masculino de corrida diária, leve e versátil para treinos e uso casual.",
  "tenis-nex-slip-on-fem": "Tênis slip-on feminino sem cadarço, prático e confortável para o dia a dia.",
  "tenis-nex-court-fem": "Tênis de quadra feminino com estabilidade lateral e solado de alta durabilidade.",
  "meia-nex-run-low": "Meia de corrida masculina cano baixo com ajuste anatômico e ventilação estratégica.",
  "meia-nex-wool": "Meia masculina em lã merino cano médio. Conforto térmico e controle de odor para longas jornadas.",
  "meia-nex-ankle-fem": "Meia feminina cano baixo esportiva com tecido respirável e toque macio.",
  "meia-nex-compressao-fem": "Meia de compressão feminina cano alto com suporte graduado para corrida e recuperação muscular.",
};

async function runSeed() {
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Calçados", slug: "calcados" } }),
    prisma.category.create({ data: { name: "Roupas Masculinas", slug: "roupas-masculinas" } }),
    prisma.category.create({ data: { name: "Roupas Femininas", slug: "roupas-femininas" } }),
    prisma.category.create({ data: { name: "Tênis Masculino", slug: "tenis-masculino" } }),
    prisma.category.create({ data: { name: "Tênis Feminino", slug: "tenis-feminino" } }),
    prisma.category.create({ data: { name: "Meias Masculinas", slug: "meias-masculinas" } }),
    prisma.category.create({ data: { name: "Meias Femininas", slug: "meias-femininas" } }),
  ]);
  const [calcados, roupasMasc, roupasFem, tenisMasc, tenisFem, meiasMasc, meiasFem] = categories;

  const P = (data: {
    name: string;
    slug: string;
    price: number;
    basePrice?: number;
    stock?: number;
    categoryId: string;
    sizes?: string[];
    colors?: string[];
    featured?: boolean;
  }) =>
    prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: descriptions[data.slug] ?? "Produto NEXSPORTS com tecnologia e design de alta performance.",
        price: data.price,
        basePrice: data.basePrice,
        stock: data.stock ?? 50,
        images: img(data.slug),
        sizes: JSON.stringify(data.sizes ?? []),
        colors: JSON.stringify(data.colors ?? ["Preto"]),
        featured: data.featured ?? false,
        categoryId: data.categoryId,
      },
    });

  const num = ["38", "39", "40", "41", "42", "43"];
  const pp = ["P", "M", "G", "GG"];

  await Promise.all([
    P({ name: "Chuteira NEX Campo Pro", slug: "chuteira-nex-campo", price: 399.9, basePrice: 499.9, stock: 35, categoryId: calcados.id, sizes: num, colors: ["Preto", "Branco"], featured: true }),
    P({ name: "Chuteira NEX Futsal Max", slug: "chuteira-nex-futsal", price: 279.9, stock: 40, categoryId: calcados.id, sizes: num, colors: ["Preto", "Coral"] }),
    P({ name: "Tênis NEX Basquete Force", slug: "tenis-nex-basquete", price: 549.9, basePrice: 649.9, stock: 25, categoryId: calcados.id, sizes: num, colors: ["Preto", "Vermelho"] }),
    P({ name: "Tênis NEX Trail Explorer", slug: "tenis-nex-trail", price: 449.9, stock: 30, categoryId: calcados.id, sizes: num, colors: ["Grafite", "Verde"] }),
    P({ name: "Tênis NEX Court Ace", slug: "tenis-nex-court", price: 379.9, stock: 35, categoryId: calcados.id, sizes: num, colors: ["Branco", "Azul"] }),
    P({ name: "Chinelo NEX Slide Comfort", slug: "chinelo-nex-slide", price: 99.9, basePrice: 129.9, stock: 80, categoryId: calcados.id, sizes: num, colors: ["Preto", "Branco"] }),
    P({ name: "Tênis NEX Training Flex", slug: "tenis-nex-training", price: 329.9, stock: 45, categoryId: calcados.id, sizes: num, colors: ["Preto", "Cinza"] }),
    P({ name: "Tênis NEX Casual Low", slug: "tenis-nex-casual-masc", price: 299.9, stock: 50, categoryId: calcados.id, sizes: num, colors: ["Branco", "Preto"] }),
    P({ name: "Tênis NEX Volley Pro", slug: "tenis-nex-volley", price: 419.9, stock: 28, categoryId: calcados.id, sizes: num, colors: ["Branco", "Coral"] }),
    P({ name: "Tênis NEX Hybrid Run", slug: "tenis-nex-hybrid", price: 359.9, stock: 38, categoryId: calcados.id, sizes: num, colors: ["Preto", "Cinza"] }),
    P({ name: "Tênis NEX Offroad X", slug: "tenis-nex-offroad", price: 469.9, stock: 22, categoryId: calcados.id, sizes: num, colors: ["Grafite", "Marrom"] }),
  ]);

  await Promise.all([
    P({ name: "Camiseta NEX Dry Fit Masculina", slug: "camiseta-nex-dry-masculina", price: 89.9, basePrice: 119.9, stock: 120, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Branco", "Cinza"], featured: true }),
    P({ name: "Regata NEX Basquete Jersey", slug: "camiseta-nex-basquete", price: 109.9, stock: 60, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Vermelho"] }),
    P({ name: "Bermuda NEX Training Masculina", slug: "bermuda-nex-training-masc", price: 129.9, stock: 75, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Cinza"] }),
    P({ name: "Moletom NEX Essentials Masculino", slug: "moletom-nex-essentials-masc", price: 229.9, basePrice: 279.9, stock: 45, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Grafite"] }),
    P({ name: "Regata NEX Running Masculina", slug: "regata-nex-running-masc", price: 79.9, stock: 90, categoryId: roupasMasc.id, sizes: pp, colors: ["Branco", "Coral"] }),
    P({ name: "Jaqueta NEX Corta-Vento", slug: "jaqueta-nex-corta-vento", price: 299.9, stock: 35, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Azul"] }),
    P({ name: "Calça NEX Jogger Masculina", slug: "calca-nex-jogger-masc", price: 199.9, stock: 55, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Grafite"] }),
    P({ name: "Camiseta NEX Compressão ML", slug: "camiseta-nex-compressao-masc", price: 149.9, stock: 50, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto"] }),
    P({ name: "Camisa NEX Polo Sport", slug: "camisa-nex-polo", price: 159.9, stock: 40, categoryId: roupasMasc.id, sizes: pp, colors: ["Branco", "Preto", "Azul"] }),
    P({ name: "Bermuda NEX Moletom", slug: "bermuda-nex-moletom", price: 139.9, stock: 60, categoryId: roupasMasc.id, sizes: pp, colors: ["Preto", "Grafite"] }),
    P({ name: "Camiseta NEX Oversized Masculina", slug: "camiseta-nex-oversized-masc", price: 119.9, stock: 70, categoryId: roupasMasc.id, sizes: pp, colors: ["Branco", "Preto"] }),
  ]);

  await Promise.all([
    P({ name: "Top NEX Support Alto Impacto", slug: "top-nex-support-feminino", price: 129.9, stock: 80, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Coral", "Branco"], featured: true }),
    P({ name: "Legging NEX Power Cintura Alta", slug: "legging-nex-power", price: 189.9, basePrice: 239.9, stock: 70, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Grafite"] }),
    P({ name: "Camiseta NEX Cropped Feminina", slug: "camiseta-nex-cropped", price: 99.9, stock: 85, categoryId: roupasFem.id, sizes: pp, colors: ["Branco", "Preto"] }),
    P({ name: "Saia NEX Sport com Short", slug: "saia-nex-sport", price: 149.9, stock: 40, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Branco"] }),
    P({ name: "Macacão NEX Yoga", slug: "macacao-nex-yoga", price: 259.9, stock: 30, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Vinho"] }),
    P({ name: "Jaqueta NEX Windbreaker Feminina", slug: "jaqueta-nex-windbreaker-fem", price: 279.9, stock: 32, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Coral"] }),
    P({ name: "Shorts NEX Run Feminino", slug: "shorts-nex-run-fem", price: 119.9, stock: 65, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Cinza"] }),
    P({ name: "Regata NEX Seamless Feminina", slug: "regata-nex-seamless", price: 109.9, stock: 55, categoryId: roupasFem.id, sizes: pp, colors: ["Coral", "Preto"] }),
    P({ name: "Moletom NEX Crop Feminino", slug: "moletom-nex-crop-fem", price: 219.9, stock: 38, categoryId: roupasFem.id, sizes: pp, colors: ["Grafite", "Branco"] }),
    P({ name: "Shorts NEX Ciclista", slug: "shorts-nex-ciclista", price: 129.9, stock: 58, categoryId: roupasFem.id, sizes: pp, colors: ["Preto", "Grafite"] }),
    P({ name: "Camiseta NEX Oversized Feminina", slug: "camiseta-nex-oversized-fem", price: 109.9, stock: 66, categoryId: roupasFem.id, sizes: pp, colors: ["Coral", "Branco"] }),
  ]);

  await Promise.all([
    P({ name: "Tênis NEX Runner Pro", slug: "nex-runner-pro", price: 499.9, basePrice: 649.9, stock: 45, categoryId: tenisMasc.id, sizes: num, colors: ["Preto", "Branco", "Coral"], featured: true }),
    P({ name: "Tênis NEX Ghost Runner", slug: "tenis-nex-ghost", price: 549.9, stock: 35, categoryId: tenisMasc.id, sizes: num, colors: ["Branco", "Grafite"] }),
    P({ name: "Tênis NEX Velocity Elite", slug: "tenis-nex-velocity", price: 799.9, basePrice: 999.9, stock: 20, categoryId: tenisMasc.id, sizes: num, colors: ["Coral", "Preto"] }),
    P({ name: "Tênis NEX Stability Max", slug: "tenis-nex-stability", price: 459.9, stock: 30, categoryId: tenisMasc.id, sizes: num, colors: ["Azul", "Preto"] }),
    P({ name: "Tênis NEX Skate Street", slug: "tenis-nex-skate", price: 279.9, stock: 48, categoryId: tenisMasc.id, sizes: num, colors: ["Preto", "Branco"] }),
    P({ name: "Tênis NEX Urban Flow", slug: "tenis-nex-urban", price: 329.9, stock: 55, categoryId: tenisMasc.id, sizes: num, colors: ["Branco", "Cinza"] }),
    P({ name: "Tênis NEX Clay Master", slug: "tenis-nex-clay", price: 389.9, stock: 26, categoryId: tenisMasc.id, sizes: num, colors: ["Branco", "Verde"] }),
    P({ name: "Tênis NEX Trail Explorer M", slug: "tenis-nex-trail-masc", price: 449.9, stock: 30, categoryId: tenisMasc.id, sizes: num, colors: ["Grafite"] }),
    P({ name: "Tênis NEX Training Flex M", slug: "tenis-nex-training-masc", price: 329.9, stock: 42, categoryId: tenisMasc.id, sizes: num, colors: ["Preto", "Cinza"] }),
    P({ name: "Tênis NEX Knit Comfort", slug: "tenis-nex-knit", price: 339.9, stock: 36, categoryId: tenisMasc.id, sizes: num, colors: ["Cinza", "Preto"] }),
    P({ name: "Tênis NEX Daily Run", slug: "tenis-nex-daily", price: 299.9, stock: 44, categoryId: tenisMasc.id, sizes: num, colors: ["Preto", "Branco"] }),
  ]);

  await Promise.all([
    P({ name: "Tênis NEX Runner Feminino", slug: "nex-runner-feminino", price: 449.9, stock: 60, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Rosa", "Preto"], featured: true }),
    P({ name: "Tênis NEX Feather Light", slug: "tenis-nex-feather", price: 399.9, basePrice: 479.9, stock: 40, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Cinza"] }),
    P({ name: "Tênis NEX Tempo Training", slug: "tenis-nex-tempo", price: 349.9, stock: 45, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Coral", "Preto"] }),
    P({ name: "Tênis NEX Dance Flow", slug: "tenis-nex-dance", price: 299.9, stock: 35, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Preto", "Branco"] }),
    P({ name: "Tênis NEX Trail Feminino", slug: "tenis-nex-trail-fem", price: 429.9, stock: 28, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Grafite", "Lilás"] }),
    P({ name: "Tênis NEX Volley Feminino", slug: "tenis-nex-volley-fem", price: 399.9, stock: 32, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Azul"] }),
    P({ name: "Tênis NEX Pilates Flex", slug: "tenis-nex-pilates", price: 269.9, stock: 38, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Nude", "Preto"] }),
    P({ name: "Tênis NEX Fashion Chunky", slug: "tenis-nex-fashion", price: 379.9, basePrice: 449.9, stock: 42, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Bege"] }),
    P({ name: "Tênis NEX Basket Feminino", slug: "tenis-nex-basket-fem", price: 489.9, stock: 22, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Rosa"] }),
    P({ name: "Tênis NEX Slip-On Feminino", slug: "tenis-nex-slip-on-fem", price: 249.9, stock: 50, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Preto"] }),
    P({ name: "Tênis NEX Court Feminino", slug: "tenis-nex-court-fem", price: 369.9, stock: 34, categoryId: tenisFem.id, sizes: ["34", "35", "36", "37", "38", "39"], colors: ["Branco", "Lilás"] }),
  ]);

  await Promise.all([
    P({ name: "Meia NEX Compressão Cano Alto", slug: "meia-nex-compressao-masculina", price: 39.9, basePrice: 49.9, stock: 200, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Preto", "Branco", "Cinza"] }),
    P({ name: "Meia NEX Performance Running", slug: "meia-nex-performance", price: 44.9, stock: 150, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Preto", "Coral"] }),
    P({ name: "Meia NEX Training 3/4", slug: "meia-nex-training-masc", price: 34.9, stock: 180, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Branco", "Preto"] }),
    P({ name: "Meia NEX Trail Cano Alto", slug: "meia-nex-trail", price: 54.9, stock: 100, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Grafite", "Verde"] }),
    P({ name: "Meia NEX Basket Cano Longo", slug: "meia-nex-basket", price: 42.9, stock: 120, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Branco", "Preto"] }),
    P({ name: "Meia NEX Casual Cano Baixo", slug: "meia-nex-casual", price: 24.9, stock: 250, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Branco", "Preto", "Cinza"] }),
    P({ name: "Meião NEX Soccer Pro", slug: "meia-nex-soccer", price: 49.9, stock: 110, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Preto", "Branco"] }),
    P({ name: "Meia NEX Everyday Cotton", slug: "meia-nex-everyday", price: 29.9, stock: 300, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Branco", "Cinza"] }),
    P({ name: "Meia NEX Cycling Aero", slug: "meia-nex-cycling", price: 59.9, stock: 80, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Preto", "Coral"] }),
    P({ name: "Meia NEX Run Low", slug: "meia-nex-run-low", price: 32.9, stock: 170, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Preto", "Branco"] }),
    P({ name: "Meia NEX Wool Merino", slug: "meia-nex-wool", price: 64.9, stock: 70, categoryId: meiasMasc.id, sizes: ["39-41", "42-44"], colors: ["Grafite"] }),
  ]);

  await Promise.all([
    P({ name: "Kit Meia NEX Invisível c/3", slug: "meia-nex-invisivel-feminina", price: 34.9, stock: 150, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Nude", "Preto"] }),
    P({ name: "Meia NEX Running Feminina", slug: "meia-nex-running-fem", price: 44.9, stock: 130, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Coral"] }),
    P({ name: "Meia NEX Training Feminina", slug: "meia-nex-training-fem", price: 32.9, stock: 160, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Preto"] }),
    P({ name: "Meia NEX Yoga Antiderrapante", slug: "meia-nex-yoga", price: 39.9, stock: 90, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Cinza", "Preto"] }),
    P({ name: "Meia NEX Casual Feminina", slug: "meia-nex-casual-fem", price: 24.9, stock: 220, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Nude"] }),
    P({ name: "Meia NEX Sport Cano Médio", slug: "meia-nex-sport-fem", price: 29.9, stock: 180, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Rosa"] }),
    P({ name: "Meia NEX Fitness Crew", slug: "meia-nex-fitness", price: 34.9, stock: 140, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Preto", "Coral"] }),
    P({ name: "Meia NEX Dance Soft", slug: "meia-nex-dance", price: 27.9, stock: 100, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Nude", "Preto"] }),
    P({ name: "Meia NEX Everyday Feminina", slug: "meia-nex-everyday-fem", price: 26.9, stock: 260, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Cinza"] }),
    P({ name: "Meia NEX Ankle Feminina", slug: "meia-nex-ankle-fem", price: 24.9, stock: 190, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Branco", "Preto"] }),
    P({ name: "Meia NEX Compressão Feminina", slug: "meia-nex-compressao-fem", price: 49.9, stock: 95, categoryId: meiasFem.id, sizes: ["34-36", "37-39"], colors: ["Preto", "Coral"] }),
  ]);

  const total = await prisma.product.count();
  return { categorias: categories.length, produtos: total };
}

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || req.headers.get("x-seed-token");
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const result = await runSeed();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[seed] erro:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro ao rodar o seed." },
      { status: 500 }
    );
  }
}
