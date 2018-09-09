--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

-- Started on 2018-09-09 11:10:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2216 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 190 (class 1259 OID 24811)
-- Name: Answer; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Answer" (
    id_answer integer NOT NULL,
    id_question integer NOT NULL,
    text_answer text,
    likes_answer integer
);


ALTER TABLE public."Answer" OWNER TO "biamaweb";

--
-- TOC entry 187 (class 1259 OID 24761)
-- Name: Curiosity; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Curiosity" (
    forum_type text NOT NULL,
    title text,
    image text NOT NULL,
    "descriptionCuriosity" text
);


ALTER TABLE public."Curiosity" OWNER TO "biamaweb";

--
-- TOC entry 191 (class 1259 OID 24824)
-- Name: Favorite; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Favorite" (
    id_favorite integer NOT NULL,
    user_id integer NOT NULL,
    material_id integer,
    question_id integer,
    answer_id integer
);


ALTER TABLE public."Favorite" OWNER TO "biamaweb";

--
-- TOC entry 182 (class 1259 OID 16458)
-- Name: Forum; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Forum" (
    type_forum text NOT NULL,
    library_id integer NOT NULL
);


ALTER TABLE public."Forum" OWNER TO "biamaweb";

--
-- TOC entry 183 (class 1259 OID 24605)
-- Name: Library; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Library" (
    id_library integer NOT NULL,
    location text,
    description text,
    "locationDescription" text
);


ALTER TABLE public."Library" OWNER TO "biamaweb";

--
-- TOC entry 186 (class 1259 OID 24640)
-- Name: Library_Material; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Library_Material" (
    library_id integer NOT NULL,
    material_id integer NOT NULL
);


ALTER TABLE public."Library_Material" OWNER TO "biamaweb";

--
-- TOC entry 185 (class 1259 OID 24623)
-- Name: Library_User; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Library_User" (
    library_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Library_User" OWNER TO "biamaweb";

--
-- TOC entry 181 (class 1259 OID 16413)
-- Name: Material; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Material" (
    id integer NOT NULL,
    type text,
    color text,
    code text,
    name text,
    category text,
    description text
);


ALTER TABLE public."Material" OWNER TO "biamaweb";

--
-- TOC entry 195 (class 1259 OID 24912)
-- Name: sequence_notification; Type: SEQUENCE; Schema: public; Owner: BiAMa
--

CREATE SEQUENCE public.sequence_notification
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.sequence_notification OWNER TO "biamaweb";

--
-- TOC entry 193 (class 1259 OID 24900)
-- Name: Notification; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Notification" (
    id_notification bigint DEFAULT nextval('public.sequence_notification'::regclass) NOT NULL,
    text_notification text,
    date_notification text,
    insert text,
    id_user text
);


ALTER TABLE public."Notification" OWNER TO "biamaweb";

--
-- TOC entry 192 (class 1259 OID 24871)
-- Name: sequence_start_0; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sequence_start_0
    START WITH 0
    INCREMENT BY 1
    MINVALUE 0
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.sequence_start_0 OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 24796)
-- Name: Question; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Question" (
    id_question bigint DEFAULT nextval('public.sequence_start_0'::regclass) NOT NULL,
    text_question text,
    likes_question integer,
    forum_type text
);


ALTER TABLE public."Question" OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 24783)
-- Name: Share; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Share" (
    forum_type text NOT NULL,
    title text,
    image text NOT NULL,
    "descriptionShare" text
);


ALTER TABLE public."Share" OWNER TO "biamaweb";

--
-- TOC entry 194 (class 1259 OID 24909)
-- Name: sequence_user; Type: SEQUENCE; Schema: public; Owner: BiAMa
--

CREATE SEQUENCE public.sequence_user
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999
    CACHE 1;


ALTER TABLE public.sequence_user OWNER TO "biamaweb";

--
-- TOC entry 184 (class 1259 OID 24613)
-- Name: User; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."User" (
    id bigint DEFAULT nextval('public.sequence_user'::regclass) NOT NULL,
    name text,
    email text,
    birthdate text,
    image text,
    username text,
    password text
);


ALTER TABLE public."User" OWNER TO "biamaweb";

--
-- TOC entry 2202 (class 0 OID 24811)
-- Dependencies: 190
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Answer" (id_answer, id_question, text_answer, likes_answer) FROM stdin;
2	2	Realmente, tem mais sentido.	0
1	1	Este material pode estar incluído em diferentes categorias.	0
3	1	Mas pensando nisso...	0
\.


--
-- TOC entry 2199 (class 0 OID 24761)
-- Dependencies: 187
-- Data for Name: Curiosity; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Curiosity" (forum_type, title, image, "descriptionCuriosity") FROM stdin;
forum1	Plastic-fish	plastic_6.png	Este material é feito de escamas de peixe compactadas que são aquecidas sob pressão, criando um composto sólido. Todo mundo que pega esse material, uma vez dito que é feito de escamas de peixe, sempre o cheira. Não tem cheiro de peixe. Realmente não cheira nada - o processo de fabricação esteriliza completamente a balança, portanto não há odor residual nem essência do peixe restante.
forum2	Projeto-animal	proj1_animal.png	Este infeliz escorpião é sepultado em uma bolha de plástico transparente com uma base azul perolada e está sendo usado para pesar papéis, ou como um ornamento ligeiramente alarmante. Está preso a um disco de feltro sintético para proteger sua mesa. O plástico é uma resina de fundição líquida sintética de duas partes - geralmente acrílico ou poliuretano. Em seu estado líquido, é um monômero, que é misturado com seu agente químico de cura ou catalisador, e vertido em um molde contendo o escorpião. Como a resina endurece, "polimeriza" em um polímero. A reação exotérmica química faz com que o plástico aqueça durante a cura, tornando a maioria das resinas de fundição impróprias para cera ou outros objetos de baixo ponto de fusão. Pouco antes de a resina clara ficar dura, o fabricante colocaria outra camada fina contendo pigmento azul e algum tipo de pó perolado, para dar ao peso de papel aquele efeito no fundo do mar. O molde usado para a forma de bolha foi provavelmente feito de borracha de silicone, o que permite que o objeto se torne claro e brilhante,\r\nsem necessidade de polimento. A resina não é uma substância agradável para se trabalhar, pois libera vapores químicos irritantes que são muito fedorentos. Os tipos anteriores de resina tendiam a ficar amarelados, frágeis ou turvos com a idade e a exposição aos raios UV durante o dia, arruinando muitos monitores de museus, mas formulações mais modernas permanecerão claras e duras indefinidamente.
\.


--
-- TOC entry 2203 (class 0 OID 24824)
-- Dependencies: 191
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Favorite" (id_favorite, user_id, material_id, question_id, answer_id) FROM stdin;
0	1	2	-1	\N
\.


--
-- TOC entry 2194 (class 0 OID 16458)
-- Dependencies: 182
-- Data for Name: Forum; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Forum" (type_forum, library_id) FROM stdin;
forum1	1
forum2	2
forum3	2
\.


--
-- TOC entry 2195 (class 0 OID 24605)
-- Dependencies: 183
-- Data for Name: Library; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Library" (id_library, location, description, "locationDescription") FROM stdin;
2	embed?pb=!1m18!1m12!1m3!1d3112.171639197157!2d-9.140899049968251!3d38.73682336389977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a24aa81f17%3A0x880c7c731a54423!2sInstituto+Superior+T%C3%A9cnico!5e0!3m2!1spt-PT!2spt!4v1529528847654	Com os avanços da tecnologia, surge a necessidade de criar bibliotecas digitais de acesso aberto. Este tipo de bibliotecas são muito úteis no que diz respeito à deslocação, pois não é necessário o utilizador se deslocar para pesquisar algum material, projeto de material, entre outros. O nome BiAMa, tem como significado "Biblioteca Aberta de Materiais".	Instituto Superior Técnico de Lisboa
1	embed?pb=!1m18!1m12!1m3!1d6223.537995391765!2d-9.19961064513007!3d38.74606284620067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1eccd41dcab0e3%3A0x2f691f9dce18f0f5!2sEscola+Superior+de+Educa%C3%A7%C3%A3o+de+Lisboa%2C+Lisboa!5e0!3m2!1spt-PT!2spt!4v1529528684919	Com os avanços da tecnologia, surge a necessidade de criar bibliotecas digitais de acesso aberto. Este tipo de bibliotecas são muito úteis no que diz respeito à deslocação, pois não é necessário o utilizador se deslocar para pesquisar algum material, projeto de material, entre outros. O nome BiAMa, tem como significado "Biblioteca Aberta de Materiais".	Escola Superior de Educação de Lisboa
\.


--
-- TOC entry 2198 (class 0 OID 24640)
-- Dependencies: 186
-- Data for Name: Library_Material; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Library_Material" (library_id, material_id) FROM stdin;
1	1
1	4
1	5
1	6
1	7
2	2
2	3
2	8
1	10
1	11
1	13
1	14
2	15
1	16
1	17
1	18
2	19
2	20
1	21
1	22
1	23
2	24
2	25
1	26
1	27
1	28
2	29
1	30
2	31
1	32
1	33
1	34
1	35
2	36
2	37
2	38
2	39
1	40
1	42
1	43
2	44
2	46
2	47
1	48
2	49
2	12
2	50
2	51
\.


--
-- TOC entry 2197 (class 0 OID 24623)
-- Dependencies: 185
-- Data for Name: Library_User; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Library_User" (library_id, user_id) FROM stdin;
2	1
3	2
5	8
7	9
8	10
\.


--
-- TOC entry 2193 (class 0 OID 16413)
-- Dependencies: 181
-- Data for Name: Material; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Material" (id, type, color, code, name, category, description) FROM stdin;
51	Animal	branco	51	an_01.png	Animal	ss
1	animal	preto	1\r\n	an_03.png	Animal	O couro de pele de cobra é considerado um produto exótico e favorecido pela sua aparência escamosa. Ele é usado para fazer acessórios de bolsas para cintos.
24	composito	branco	24	016_c.png	Composito	Este bloco de 8 polegadas brilhante e suave é comumente usado para pisos ou móveis. É feito de 85% de agregados de vidro reciclado mantidos juntos por resina livre de solvente.
13	cerâmica	cinzento	13	00_ce.png	Cerâmica	No futuro, podemos estar cercados por estruturas de concreto, capazes de auto-curar rachaduras em sua estrutura, com bactérias especiais fazendo o trabalho por nós. Pequenas fissuras no concreto não afetam necessariamente a integridade estrutural a curto prazo, mas permitem que a água e outros produtos químicos penetrem na estrutura, o que pode causar grandes problemas ao longo do tempo. O concreto autorrecuperável possui bactérias adormecidas e uma fonte de alimento (amido) embutida no concreto. Quando uma rachadura aparece no concreto, a água penetra e reativa as bactérias. Depois que eles acordam, as bactérias comem seu lanche e, então, convenientemente excretam a calcita, que cura o crack. As bactérias podem sobreviver inativas no material por 50 anos.
26	metal	cinzento	26	017_me.png	Metal	Este fio metálico em forma de mola é feito de uma liga especial de níquel e titânio (comumente chamada de liga de memória de forma) que é capaz de contrair 4% ou mais quando aquecida e depois retornar à sua forma original ao resfriar. A capacidade desse material de se contrair por aquecimento o torna útil em dispositivos mecânicos onde o calor, que geralmente é fornecido com precisão por meio de uma corrente elétrica, é usado para gerar algum tipo de movimento. Os atuadores de memória de forma (SMA) são encontrados em uma ampla variedade de aplicações, desde dispositivos médicos (bombas de insulina portáteis) até computadores e máquinas de venda automática.
41	polímeros	cinzento	41	024_p.png	Polímeros	O polietileno de alto peso molecular (HMWPE) é um material sólido resistente a raios UV e a intempéries. Este bloco em particular é feito de sucatas HMWPE de fabricação. Devido à sua natureza resistente, tem muitos usos internos e externos.
10	animal	verde	10	an_00.png	Animal	Este material é feito de escamas de peixe compactadas que são aquecidas sob pressão, criando um composto sólido. Todo mundo que pega esse material, uma vez dito que é feito de escamas de peixe, sempre o cheira. Não tem cheiro de peixe. Realmente não cheira nada - o processo de fabricação esteriliza completamente a balança, portanto não há odor residual nem essência do peixe restante.
14	cerâmica	laranja	14	01_ce.png	Cerâmica	This orange plate is part of a cup and saucer set of Fiestaware, from the USA. Uranium oxide was used in the glaze, which makes these pieces radioactive. Fiesta was the first widely mass-marketed solid-colour dinnerware and became extremely popular due to its bright colours, durable construction and stylized art deco designs. After its introduction in 1936 it was a widespread fad in the USA for over 10 years, becoming somewhat of a status symbol. During the Second World War, the US government took control of uranium in the country and confiscated the stocks of all companies which used it. Nowadays, the government advises that these pieces are not used, however they are still very popular collectors’ items.
44	polímeros	amarelo	44	031_p.png	Polímeros	As esponjas do mar são animais marinhos que são colhidos pelos seus "esqueletos" fibrosos que são utilizados como ferramentas de limpeza, enchimento e muito mais. Esponjas sintéticas são feitas de polímeros plásticos altamente absorventes. Esponjas naturais tendem a reter mais água.
22	composito	branco	22	015_c.png	Composito	FLECT é um laço reflexivo semelhante ao tecido de alta visibilidade. A renda é feita de fibras de lã e fibras reflexivas. A luz se reflete na LFLECT, tornando-se uma alternativa em potencial para a popular roupa neon amarela de alta visibilidade. Pode ser adicionado a qualquer item de roupa.\r\n
45	vegetal	castanho	45	00_v.png	Vegetal	Zebrawood, como o próprio nome sugere, tem listras escuras características em seus grãos. Sua dureza e textura grosseira dificultam o trabalho. Esta madeira é normalmente usada para fazer itens decorativos, como móveis personalizados ou guitarras. Ele tem sido usado como alças de ferramentas e esquis também.
34	mineral	diamante	34	011_m.png	Mineral	Este cristal romboédrico claro é o carbonato de cálcio, um composto de cálcio e carbono. Existe em três formas minerais diferentes conhecidas como aragonite, vaterite e calcite. O mais estável dos três é a calcita, e essa é a forma desse cristal. A calcita pura é transparente, no entanto pequenas quantidades de impurezas diferentes podem dar tons de cinza, vermelho, laranja, amarelo, verde, azul, violeta, marrom ou mesmo preto. A calcita pode ocorrer naturalmente como cristais muito grandes, o maior no registro medindo 6 × 6 × 3 metros, pesando 250 toneladas. O carbonato de cálcio é um ingrediente fundamental em muitos processos de biomineralização, fornecendo ossos, dentes e conchas.
4	metal	cinzento	4	08_me.png	Metal	Este cilindro de alumínio manchado é mais pesado do que você esperaria - o alumínio é geralmente conhecido por ser um metal espetacularmente leve. Essa característica inesperada é um pouco misteriosa, mas provavelmente tem a ver com o processo pelo qual ela foi produzida. A metalurgia do pó é o processo de misturar metais finos em pó, compactando-os em uma forma desejada e depois aquecendo o pó comprimido em uma atmosfera controlada até que suas partículas se colem umas às outras (sinterização). Esta técnica de fabricação aditiva tem sido particularmente útil, pois permite a fabricação de peças com muito pouca sucata e, geralmente, requer menos energia do que as técnicas de processamento convencionais, pois o forno de sinterização é aquecido abaixo do ponto de fusão do alumínio. Ligas de pó de alumínio sinterizado podem ter propriedades bem diferentes das do alumínio fabricado por técnicas convencionais de fundição. O processo de sinterização em pó pode ser controlado de forma a melhorar propriedades como resistência, resistência à corrosão e altas temperaturas e condutividade elétrica e térmica. A porosidade e a densidade do material também podem ser controladas, dependendo das práticas de sinterização e da composição de pós metálicos de alumínio e de liga usados.
32	mineral	cinzento	32	06_m.png	Mineral	A ardósia é uma rocha metamórfica cinza / azul / verde-ish que é formada por camadas de xisto, uma rocha sedimentar que é depositada no leito de córregos e rios. Ao longo de vastos períodos de tempo, à medida que as camadas de pó de xisto se acumulam, o calor e a pressão exercidos sobre essas camadas aumentam, o que causa a transformação metamórfica do xisto em ardósia. A ardósia é encontrada em regiões montanhosas, explicando sua presença no noroeste do País de Gales, onde a mineração atingiu seu auge em 1800 e ainda é escavada até hoje, embora em escala muito menor. A ardósia contém o que é conhecido como um plano de clivagem - uma camada quebradiça que separa folhas finas de ardósia. Batendo ao longo deste plano com um martelo e cinzel permite que as camadas se separem, formando um ladrilho liso normalmente usado para coberturas e pisos.
35	mineral	cinzento	35	07_m.png	Mineral	Este pedaço de rocha cinza de granulação fina é o tipo de ardósia mais forte e mais durável já descoberto. É extraído no noroeste do País de Gales, a indústria que rodeava a mineração costumava dominar a atividade econômica dessa área até o início do século XX. É muito resistente a altas temperaturas e produtos químicos, e sua baixa taxa de absorção faz com que seja muito resistente a danos causados ​​pela geada e quebra - uma das principais razões para sua popularidade como material de cobertura. Sua durabilidade é outra razão para seu uso na indústria da construção. Alguns exemplos famosos de telhados que utilizaram este material podem ser vistos em Londres na estação de St Pancras ou na No.10 Downing Street. A ardósia galesa também é um material muito popular na pavimentação, revestimento e paredes, enquanto as ardósias de alta qualidade também são usadas para lápides e quadros-negros. Devido à sua estabilidade e inércia química, as ardósias também são usadas na fabricação de bancadas de laboratório e a estabilidade do material o torna ideal para a superfície plana sob o feltro de mesas de bilhar e sinuca. Ardósia fina também pode ser usada como pedra de amolar para afiar facas.
18	composito	beje	18	04_c.png	Composito	Esta é uma amostra rara de aerogel de sílica que é essencialmente uma espuma de vidro cuja estrutura nanométrica contém até 99,8% de ar, tornando-o o sólido mais leve do mundo. Foi feito por Steve M. Jones, Laboratório de Propulsão a Jato da NASA como parte do projeto de pesquisa da Stardust, que envolveu o envio de uma espaçonave contendo um grande pedaço de aerogel numa aproximação ao cometa Wild 2 para coletar poeira espacial. O que tornou o aerogel ideal para a missão foi que, esta espuma ultra fina pode gradualmente desacelerar e capturar partículas de poeira em bom estado. O processo de peneirar o aerogel, micron por mícron, para identificar e coletar a poeira espacial foi a maior atividade de microscopia colaborativa do mundo. O material parece ser muito mais invisível que o vidro, apesar de ser menos transparente, pois não há reflexo em suas superfícies, dando a impressão de não ser totalmente sólido. Sua cor azul não é devido a qualquer pigmentação, mas é causada pelo mesmo fenômeno que dá cor à atmosfera da nossa Terra, ou seja, a dispersão de luz de Raleigh. Em outras palavras, é azul pelas mesmas razões que o céu é azul.
19	composito	beje	19	05_c.png	Composito	Nós demonstramos um novo adesivo micro-fabricado baseado no mesmo mecanismo de física que subjaz à incrível capacidade de escalada das lagartixas. O trabalho é avaliado por especialistas como a primeira prova de conceito de adesivos secos baseada na interação de van der Waals. O segredo de como as lagartixas são capazes de realizar extraordinárias travessuras de escalada; Os pesquisadores confirmaram que pequenas forças intermoleculares - as chamadas forças de van der Waals - foram produzidas literalmente por bilhões de pequenas estruturas parecidas com pêlos, ou espátulas, em cada lagartixa. Essas forças, que surgem quando cargas elétricas desequilibradas ao redor das moléculas se atraem, permitem que o animal corra pelas paredes e até pendure de cabeça para baixo no vidro polido. Eles fabricaram matrizes de pilares de plástico com pouco mais de dois milésimos de milímetro de altura; o espaçamento dos pilares é em escala semelhante. Eles estão ligados a uma base flexível que se move para trazer os minúsculos pêlos sintéticos em contato com todas as pequenas ondulações que existem mesmo nas superfícies mais lisas. Pesquisadores desenvolveram um adesivo super pegajoso modelado no pé da lagartixa que agarra até mesmo as superfícies mais escorregadias. Os estudiosos há muito se maravilharam com as habilidades superlativas de escalada dos lagartos da lagartixa. Mas só recentemente os cientistas descobriram como as criaturas gerenciam suas proezas que desafiam a gravidade. O nanotecnólogo Andre K. Geim, da Universidade de Manchester, e seus colegas decidiram criar um novo tipo de adesivo, imitando o mecanismo de agarrar da lagartixa. Seu protótipo - que consiste em uma série de fios de poliimida microfabricados presos a uma base flexível - exibe uma força adesiva por cabelo comparável à de um pé de geco. E a base flexível garante que o maior número possível de cabelos entre em contato com o substrato. Porque o adesivo está seco, pode ser anexado e destacado repetidamente.
17	composito	preto	17	010_c.png	Composito	Esta esfera grande se encaixa na palma da mão de uma mulher adulta, parece uma bola de canhão de cor e textura, mas pegue-a e você perceberá que ela é desconcertantemente leve. Isso é porque é feito de espuma de poliestireno expandido, revestido em uma camada de grafite. Este tipo de espuma rígida é amplamente utilizado para embalagens em que o volume, mas não o peso, é necessário. Também é um bom isolante térmico e amortecedor. O poliestireno também pode ser entalhado facilmente, formado em moldes e reciclado. Por que esta bola de poliestireno é revestida de grafite, não temos certeza! A grafite é condutora, por isso, talvez tenha sido projetada para alguma forma de instrumentação científica olhando para a condutividade. Nós preferimos imaginar este item como um arremesso falso, possivelmente estrelando a cena crucial de um drama histórico sobre os Jogos das Terras Altas. Se você tem alguma idéia sobre o que isso poderia ser usado, por favor nos avise.
27	metal	cinzento	27	026_me.png	Metal	As colheres como objeto mantêm um status extremamente reconhecível e prontamente associado a comer e saborear. Um conjunto de 7 colheres foi fabricado para investigar o sabor de materiais não comestíveis como parte da tese de doutorado da Biblioteca de Materiais, Zoe Laughlin. A colher é uma colher de chá de aço inoxidável que foi eletrogalvanizada com uma camada de cromo de 10 mícrons de espessura. O cromo é comumente encontrado em muitos alimentos e em suplementos alimentares multivitamínicos. Acredita-se que seja essencial na ação da insulina e acredita-se que um consumo de 10mg por dia não cause efeitos adversos. O cromo também é um elemento adicionado ao aço para formar aço inoxidável.
29	metal	cinzento	29	028_me.png	Metal	As colheres como objeto mantêm um status extremamente reconhecível e prontamente associado a comer e saborear. Um conjunto de 7 colheres foi fabricado para investigar o sabor de materiais não comestíveis como parte da tese de doutorado da Biblioteca de Materiais, Zoe Laughlin. A colher é uma colher de chá de aço inoxidável que foi eletrogalvanizada com uma camada de cobre de 10 mícrons de espessura. O cobre elementar ocorre naturalmente em muitos alimentos, como nozes e mariscos, e é tradicionalmente usado em muitos utensílios de cozinha. No entanto, uma ingestão excessiva de cobre - maior que 1mg - pode causar dor de estômago, doença e diarréia. Além disso, altas doses prolongadas de cobre podem danificar o fígado e os rins.
5	mineral	azul	5	03_m.png	Mineral	Bastões de giz, usados ​​como instrumentos de escrita e desenho por professores de matemática e artistas, eram tradicionalmente feitos de giz natural - uma rocha sedimentar macia e porosa composta de depósitos de carbonato de cálcio formados ao longo de 90 milhões de anos da compressão dos esqueletos em decomposição do fitoplâncton (pequenas algas marinhas), no fundo do oceano. O giz tem sido usado como um pigmento na arte desde o Paleolítico, e tornou-se particularmente popular no século XV entre os primeiros artistas do Renascimento. Muitos dos gizes coloridos das crianças, os pastéis dos artistas e os “giz de pavimentação” que usamos agora são feitos de materiais calcários mais macios e menos caros, como o gesso (sulfato de cálcio). No entanto, ansiedades sobre o risco potencial para a saúde da poeira do quadro negro gerada por esses materiais mais baratos levaram ao desenvolvimento de giz de sala de aula 'sem poeira': esses gizes usam principalmente carbonato de cálcio (giz natural) como matéria-prima e são extrusados ​​como 'corda'. 'de giz. Este processo de extrusão de carbonato de cálcio torna as partículas de giz mais pesadas, de modo que elas caem diretamente no chão, em vez de voarem como poeira. Impurezas em depósitos de giz naturalmente produzem gizes de cores diferentes, mas pigmentos, neste caso um azul pálido, são adicionados para tornar as cores mais vivas. Para fazer bastões de giz, o giz ou gesso é pulverizado em um pó fino, misturado com um aglutinante (como argila), água e um pigmento para formar uma massa, então formado em cilindros e cozido.
25	metal	castanho	25	011_me.png	Metal	It is often necessary to join two metals together - like when constructing some of the huge buildings that dominate the skylines of modern cities, or the vast ocean going liners that spend months at sea at a time, transporting goods all over the planet. The economics of the car industry is highly dependent on welding robots, and the rail and pipeline industries are equally dependent on this technique. Its also a popular technique in the arts for sculpture. Welding is the technique of choice for joining together metals, which require a high-strength bond between two parent parts, and that must last indefinitely. Welding is not a trivial process however; it requires that both parts be melted together to create a permanent joint between them, and which must not be significantly weaker than the materials it is joining. Looking at this particular section, the weld joint can be seen where the interface of each steel section were brought into contact and then melted together by means of a welding torch, heating the steel to above 1400°C.
28	metal	amarelo	28	027_me.png	Metal	As colheres como objeto mantêm um status extremamente reconhecível e prontamente associado a comer e saborear. Um conjunto de 7 colheres foi fabricado para investigar o sabor de materiais não comestíveis como parte da tese de doutorado da Biblioteca de Materiais, Zoe Laughlin. A colher é uma colher de chá de aço inoxidável que foi eletrogalvanizada com uma camada de ouro de 10 mícrons de espessura. O ouro não está naturalmente presente nos géneros alimentícios, mas pode ser adicionado aos alimentos sem efeitos nocivos para o consumidor.
30	mineral	beje	30	02_m.png	Mineral	Sal de estrada é colocado em estradas no inverno para evitar a formação de gelo, ou para lidar com isso uma vez que tenha. Quando o sal é adicionado à água, diminui o ponto de fusão, portanto, a adição de sal ao gelo que acabou de congelar irá derreter. Pode não ficar derretido por muito tempo se a temperatura continuar a cair ou se você não continuar adicionando sal. No entanto, é aí que entra o outro ingrediente do sal da estrada. Grit. O grão é adicionado ao sal e isso fornece uma superfície de garra para a estrada, evitando em certa medida o desenvolvimento de gelo liso e perigosamente liso. Estradas de concreto, pontes e túneis podem sofrer extrema degradação em países onde o sal da estrada é rotineiramente usado no inverno. Isso ocorre porque o sal entra no concreto e começa a corroer o reforço de aço, a ferrugem resultante se expande criando fissuras e permitindo que o sal se infiltre ainda mais. Costumava ser chamado de câncer de concreto, mas o termo não é mais usado.
31	mineral	verde	31	01_m.png	Mineral	Bastões de giz, usados ​​como instrumentos de escrita e desenho por professores de matemática e artistas, eram tradicionalmente feitos de giz natural - uma rocha sedimentar macia e porosa composta de depósitos de carbonato de cálcio formados ao longo de 90 milhões de anos da compressão dos esqueletos em decomposição do fitoplâncton (pequenas algas marinhas), no fundo do oceano. O giz tem sido usado como um pigmento na arte desde o Paleolítico, e tornou-se particularmente popular no século XV entre os artistas do início do Renascimento. Muitos dos gizes coloridos das crianças, os pastéis dos artistas e os “giz de pavimentação” que usamos agora são feitos de materiais calcários mais macios e menos caros, como o gesso (sulfato de cálcio). No entanto, ansiedades sobre o risco potencial para a saúde da poeira do quadro negro gerada por esses materiais mais baratos levaram ao desenvolvimento de giz de sala de aula 'sem poeira': esses gizes usam principalmente carbonato de cálcio (giz natural) como matéria-prima e são extrusados ​​como 'corda'. 'de giz. Este processo de extrusão de carbonato de cálcio torna as partículas de giz mais pesadas, de modo que elas caem diretamente no chão, em vez de voarem como poeira. Impurezas em depósitos de giz naturalmente produzem gizes de cores diferentes, mas pigmentos, neste caso um verde sage, são adicionados para tornar as cores mais vivas. Para fazer bastões de giz, o giz ou gesso é pulverizado em um pó fino, misturado com um aglutinante (como argila), água e um pigmento para formar uma massa, então formado em cilindros e cozido.
33	mineral	beje	33	08_m.png	Mineral	Quando você quebra um osso em seu corpo, o osso só é capaz de se reparar efetivamente se todo o material original está presente e um bom contato pode ser forjado entre os fragmentos. Este andaime de vidro bioativo foi projetado para ajudar em situações em que essas condições não são atendidas. Ela fica entre fragmentos de osso no lugar de material perdido. No entanto, o vidro não substitui o fragmento ósseo permanentemente, ele age como uma ponte para o crescimento natural do osso. À medida que o osso cresce, ele consome o andaime, levando a uma união perfeitamente fundida. O andaime é poroso, por isso contém uma rede interconectada de poros para que as células, vasos sanguíneos e osso novo possam penetrar no material. Materialmente, o andaime tem que possuir um número de características importantes. Ele precisa ser biocompatível para que o corpo não o rejeite, ele precisa ser bioativo para se fundir ao osso existente, ele precisa suportar as mesmas cargas que o osso ao redor, e ele deve se degradar à medida que o novo osso cresce através dele.
6	polímeros	branco	6	027_p.png	Polímeros	Feito inteiramente de garrafas plásticas recicladas, o bloco é resistente às intempéries e à prova d'água. O bloco é duro e rígido e pode ser fabricado em muitos métodos diferentes.
36	polímeros	cinzento	36	02_p.png	Polímeros	Esta cera de modelagem marrom cheira um pouco como plasticina e é igualmente facilmente amolecida pelo calor de suas mãos. Sua maleabilidade e baixo ponto de fusão significam que é particularmente útil para fundição por cera perdida, onde o artista produz um modelo de cera que é subsequentemente cercado por um material de molde, geralmente feito de silicone, látex ou poliuretano. A cera é então derretida em um forno e o modelo original é destruído para que o metal derretido possa ser despejado em seu local original para produzir o molde final. Esta cera parece preta na inspeção inicial, mas se você puxar uma pequena bola e esmagá-la entre os dedos, verá que ela tem a textura e a cor do interior de uma uva passa.
8	animal	beje	8	an_01.png	Animal	Este infeliz escorpião é sepultado em uma bolha de plástico transparente com uma base azul perolada e está sendo usado para pesar papéis, ou como um ornamento ligeiramente alarmante. Está preso a um disco de feltro sintético para proteger sua mesa. O plástico é uma resina de fundição líquida sintética de duas partes - geralmente acrílico ou poliuretano. Em seu estado líquido, é um monômero, que é misturado com seu agente químico de cura ou catalisador, e vertido em um molde contendo o escorpião. Como a resina endurece, "polimeriza" em um polímero. A reação exotérmica química faz com que o plástico aqueça durante a cura, tornando a maioria das resinas de fundição impróprias para cera ou outros objetos de baixo ponto de fusão. Pouco antes de a resina clara ficar dura, o fabricante colocaria outra camada fina contendo pigmento azul e algum tipo de pó perolado, para dar ao peso de papel aquele efeito no fundo do mar. O molde utilizado para a forma de bolha foi provavelmente feito de borracha de silicone, que permite que o objeto se torne claro e brilhante, sem necessidade de polimento. A resina não é uma substância agradável para se trabalhar, pois libera vapores químicos irritantes que são muito fedorentos. Os tipos anteriores de resina tendiam a ficar amarelados, frágeis ou turvos com a idade e a exposição aos raios UV durante o dia, arruinando muitos monitores de museus, mas formulações mais modernas permanecerão claras e duras indefinidamente.
39	polímeros	laranja	39	018_p.png	Polímeros	Este objeto, agora parte de nossa vida cotidiana, é composto de duas camadas separadas de polímeros artificiais: a camada mais macia, que recria a sensação de uma esponja natural, é geralmente feita de poliuretano ou de alguns outros polímeros plásticos espumados; enquanto a camada verde escura mais fina, que serve como esfregão, é feita de malha de polietileno mais dura. O primeiro tipo dessas esponjas bifuncionais foi patenteado pela 3M como uma esponja de limpeza de carros, ou esponja de insetos: a camada dura da esponja foi projetada para remover os insetos notoriamente difíceis de remover que ficam presos ao carro. exterior.
42	polímeros	castanho	42	026_p.png	Polímeros	O pato de borracha amarelo é um brinquedo de tempo de banho icônico. Patos de borracha, como é assim chamado é tipicamente feito de borracha ou borracha, como material plástico de vinil. O pato de borracha da coleção envelheceu e ficou marrom. No entanto, não perdeu seu charme de infância.
21	composito	verde	21	012_c.png	Composito	Esta grama artificial foi projetada especificamente para uso por cães: daí seu nome K9Grass. É bom ser colocado em áreas de recreação internas para brincar e brincar. Feito com um revestimento de malha, "flow-through" significa que o resíduo líquido é capaz de passar facilmente através dele. Além disso, é lavável. No entanto, mais interessante é a presença de um agente antimicrobiano nas lâminas dessa grama chamada AlphaSan®, que usa as propriedades antimicrobianas da prata para manter o odor sob controle. Já em 1200BC, quando os pheonicianos usaram prata para armazenar água, esse material foi usado para seus efeitos antimicrobianos. Durante a 1 ª Guerra Mundial, antes do desenvolvimento de antibióticos, foi usado até mesmo para prevenir a infecção no vestir de feridas. No caso do K9Grass, a presença de íons de prata (eles devem estar em forma iônica para ter efeito antimicrobiano) interfere na reprodução de bactérias causadoras de odores. O AlphaSan® também pode ser encontrado em itens como roupas hospitalares e bancadas de cozinha, enquanto é mais adequado para aplicações em plásticos, fibras, espumas e revestimentos.
48	vegetal	beje	48	proj9_vegetable.png	Vegetal	Esta bola sólida é feita de madeira de faia e é grande o suficiente para fechar os dedos. A faia é uma madeira dura, muitas vezes de cor clara. As árvores de faia européias são comumente cultivadas na Escandinávia, onde essas formas simples de madeira sem pintura e brinquedos ainda são populares como brinquedos infantis. Bolas de faia de madeira desse tamanho são vendidas como suprimentos de artesanato, para fazer coisas como a cabeça de uma boneca, ou para mergulhar em óleos essenciais como um pot-pourri para perfumar sua casa. Eles são normalmente esculpidos em máquina em um torno para alcançar uma esfera regular.
7	vegetal	beje	7	01_v.png	Vegetal	Este pedaço de madeira de carvalho é denominado tal como foi enterrado em turfeiras durante centenas a milhares de anos. Os baixos níveis de oxigênio protegeram a madeira da decomposição. Outras condições de turfa - a presença de sais de ferro e outros minerais - reagem com o tanino na madeira, dando-lhe a sua distinta cor castanha escura a preta. Bog carvalho é altamente valioso devido à sua raridade.
46	vegetal	castanho	46	02_v.png	Vegetal	Ninhos de pássaros são encontrados em muitas formas e tamanhos. Eles são tipicamente feitos de galhos, vegetação e terra, combinados com saliva. Este ninho de pássaro foi encontrado em uma fazenda da família em Sandwich. Pouco se sabe sobre os criadores deste ninho particular de pássaros.
47	vegetal	branco	47	proj1_vegetable.png	Vegetal	Você pode reconhecer essa madeira aveludada e cinza-branca das lojas de modelos de sua infância. Porque é tão leve e fácil de cortar com uma faca de artesanato, é perfeito para fazer aviões modelo ou para o corte. Uma vez que esta madeira tem uma densidade mais baixa do que a cortiça, é utilizada noutras aplicações em que a sua baixa densidade é útil - por exemplo, como o núcleo em muitas pranchas de surf ou nas pás das turbinas eólicas. Em ambas as aplicações, é normalmente laminado com algo como um plástico reforçado com fibra de vidro, pois, embora seja forte pelo seu peso, ainda é um material muito macio e frágil. Todos os núcleos de madeira balsa na coleção da Biblioteca de Materiais mostram sinais de desgaste, e essa amostra em particular mostra os danos que podem ser causados ​​pela simples pressão sobre a madeira com os dedos. A árvore que produz esta madeira é o espetacular Ochroma Pyramidale de rápido crescimento e vida curta, que pode atingir alturas de 30 metros em 10 a 15 anos, e geralmente não vive além de 30 a 40 anos. Essas árvores são largamente encontradas nas florestas tropicais da América do Sul, sendo o Equador o maior produtor comercial de madeira de balsa. A leveza da madeira pode ser explicada pelo fato de ser composta de células grandes e de paredes finas. Quando a árvore está viva, essas células estão cheias de água para dar à árvore a força necessária para ficar na selva. Antes de ser tratada, a balsa contém cerca de cinco vezes mais água do que a lignina, mas essa água é expelida durante um processo prolongado de secagem do forno para que a madeira possa ser usada.
49	vegetal	beje	49	proj14_vegetable.png	Vegetal	O bambu pertence à família das gramíneas. É uma das plantas que mais crescem no mundo - algumas crescendo até 3 pés em um dia. Possui maior resistência à compressão que madeira, tijolo ou concreto e também possui uma resistência à tração específica que rivaliza com o aço.\r\nEmbora seja mais popular como fonte de alimento para os pandas gigantes e na culinária asiática, o bambu também é um material de construção popular: andaimes, edifícios e pontes. Essas estruturas podem ser encontradas em muitas culturas do sudeste asiático. Além disso, o bambu está sendo explorado para fazer quadros de bicicletas. Devido a sua abundância, pode ser facilmente substituível quando desgastado. Um desafio com o uso do bambu é que ele racha longitudinalmente quando seco, como visto na amostra disponível. Para combater o craqueamento e aumentar a longevidade do bambu, sua superfície poderia ser tratada com resina ou cera.
3	composito	preto	3	03_c.png	Composito	Estes óculos contêm lentes que podem ser auto-ajustadas pelo usuário à sua prescrição, e foram desenvolvidas como uma solução de cuidados com os olhos de baixo custo e acessível para pessoas em países em desenvolvimento. A lente consiste de duas membranas, entre as quais o óleo de silicone pode ser bombeado com as seringas no lado dos quadros. À medida que o fluido é bombeado para dentro ou para fora, a distância focal da lente é alterada, o que significa que a lente pode ser ajustada aos requisitos específicos do olho. As seringas podem então ser removidas. O inventor desses óculos foi indicado para o Prêmio Europeu de Invenção de 2011.
23	composito	bege	23	014_c.png	Composito	A madeira tem uma tendência a se dividir quando é presa nas bordas devido ao arranjo de seus grãos / fibras. Madeira compensada, feita de folhas finas de madeira coladas com o grão de cada folha a 90 ° da folha adjacente, provavelmente seria dividida quando pregada na borda. A granulação cruzada aumenta a resistência da folha inteira e também reduz a contração ou expansão geral. Contraplacado pode ser usado tanto inddors e ao ar livre. O compensado de uso externo usaria uma cola resistente à água para evitar a delaminação (camadas). Ao trabalhar com madeira compensada, vários fatores devem ser levados em consideração, incluindo localização, espessura do compensado e flexibilidade.
11	animal	rosa	11	an_04.png	Animal	Este sorvete liofilizado foi encomendado pela Nasa para as missões Apollo na década de 1960, mas desde sua primeira viagem ao espaço não chegou a nenhuma missão futura, pois foi encontrado em fragmentos realmente pequenos que poderiam ser perigosos para os astronautas. e seu equipamento sob condições de gravidade zero. É feito por liofilização de uma mistura de creme de coco, leite e açúcar. Este processo de liofilização, também conhecido como liofilização, remove toda a água do material de uma maneira que evita muito encolhimento ou endurecimento do material e retém o sabor, cheiro e conteúdo nutricional. O líquido é congelado e, em seguida, a temperatura aumenta cuidadosamente enquanto está sob pressão, de modo que a água congelada no material se sublima diretamente de um sólido para um gás. A espuma leve e açucarada resultante é então revestida em gelatina comestível para manter o pedaço juntos. Esta amostra fraturou e absorveu um pouco de umidade durante o tempo sentado na Biblioteca de Materiais e agora parece um pouco pegajosa e ligeiramente aderente ao toque, mas quando fresca, é uma espuma maravilhosamente quebradiça, doce e pulverulenta que produz uma sensação peculiar de giz e caramelo na língua de uma só vez. Enquanto este sorvete estiver selado para evitar que ele seja hidratado, ele pode ser mantido à temperatura ambiente por anos sem estragar. Isso ocorre porque o teor reduzido de água inibe a ação de enzimas e microorganismos que normalmente atuariam para decompor a substância.
12	animal	branco	12	an_02.png	Animal	O osso de choco é a estrutura interna dura e quebradiça encontrada nos chocos. A estrutura é o que a distingue das lulas. O cuttlebone é uma rica fonte de calcuim para pássaros engaiolados e outros animais de estimação. Também é comumente usado por ourives e joalheiros como moldes para moldar objetos pequenos. Sua fragilidade torna fácil para eles esculpir detalhes intrincados. Embora não seja um material popular, cuttlebone é abundantemente encontrado ao longo das costas.
16	cerâmica	branco	16	04_ce.png	Cerâmica	Esta amostra cilíndrica de cerâmica branca dura parece-se com plástico, mas o seu peso e a fenda vítrea soam quando duas peças são batidas juntas, doando que não é. No entanto, esta não é a sua cerâmica comum, tipo xícara de porcelana. Uma das características distintivas da cerâmica tradicional é que ela não pode ser trabalhada ou moldada depois de ser queimada, mas este material pode ser usinado com ferramentas comuns de corte de metal. O tipo de cerâmica que você teria em sua cozinha é obviamente muito frágil - imagine tentar cortar isso com uma serra elétrica! Este material é uma vitrocerâmica especial projetada, produzida em dois estágios pelo primeiro vidro fundido, e então aquecendo esse vidro com aditivos que controlam a maneira como ele cristaliza. Isso faz com que tenha algumas das propriedades de uma cerâmica e algumas de um vidro. Embora possa parecer contra-intuitivo, essa combinação de materiais torna o material final muito mais difícil e mais resistente do que um vidro ou cerâmica padrão, além de produzir propriedades interessantes, como a biocompatibilidade (a cerâmica de vidro pode ser usada como andaime para engenharia de tecidos ). Como a vitrocerâmica pode resistir a temperaturas muito altas e é resistente a ataques químicos, esse material pode ser usado para fazer peças muito difíceis para tarefas que metais e polímeros não podem gerenciar.
2	cerâmica	branco	2	03_ce.png	Cerâmica	Este minúsculo polo branco de porcelana é um anel de cerâmica de óxido de alumínio. No entanto, este não é o seu tipo comum de porcelana; Este material é tão duro que, uma vez que ele é queimado e sinterizado, ele deve ser cortado usando ferramentas de diamante. As cerâmicas tradicionais que reconhecemos nas nossas cozinhas são objectos feitos de argila e cimentos que foram endurecidos por aquecimento a altas temperaturas, enquanto que as cerâmicas avançadas ou "engenheiradas" como esta são feitas pela sinterização de pós finos de compostos químicos puros formados entre o metal ( alumínio) e elementos não-metálicos (oxigênio), como óxido de alumínio, ou elementos metalóides (silício) e não-metálicos (carbono), como carboneto de silício. Este óxido de alumínio ou pó de alumina é muitas vezes misturado com um aglutinante orgânico para ajudar a manter a forma desejada antes de ser fixado. Este pó moldado é então aquecido a uma temperatura muito alta em uma atmosfera controlada até que suas partículas individuais se fundam e formem ligações químicas (sinterização), encolhendo-as e endurecendo-as em uma cerâmica densa e forte. O resultado é um material com extrema resistência, resistência ao desgaste, resistência à corrosão, capacidade de suportar altas temperaturas e biocompatibilidade. Como os componentes principais da cerâmica de óxido de alumínio são parcialmente os mesmos minerais encontrados na estrutura óssea, ela é usada para substituições de quadril, coroas dentárias e implantes dentários.
43	polímeros	branco	43	021_p.png	Polímeros	Enquanto os primeiros balões foram feitos usando bexigas de animais secos, balões modernos são feitos de borracha de látex. Para fazer este balão, uma forma em forma de balão foi mergulhada em uma mistura de látex e pigmento laranja. A forma agora revestida é então curada em um forno onde a borracha de látex se ajusta e é então descascada da forma. O látex também é totalmente biodegradável e um balão começa a biodegradar no momento em que você o inflar e esticar a borracha. O processo de biodegradação é ainda mais acelerado pela exposição à luz solar. Dadas as condições certas, o látex pode biodegradar aproximadamente a mesma taxa que uma folha de árvore - isto é, cerca de seis meses.
40	polímeros	cinzento	40	019_p.png	Polímeros	Borracha vulcanizada é o material de pneus de carros, válvulas industriais e botas wellington tradicionais. É resistente, elástico, impermeável, resistente a solventes e impermeável ao calor e frio moderados. No entanto, essas propriedades não são naturais. Borracha de látex "natural" ou não curada é a seiva de vários tipos de seringueira. Neste estado a borracha é muito elástica, mas não dura. Com o tempo ele vai secar, rachar e desmoronar enquanto se decompõe. O processo de vulcanização foi descoberto por Charles Goodyear (estranhamente, nenhuma relação com os fabricantes de pneus Goodyear) e foi sem dúvida uma das mais importantes descobertas industriais da época. Borracha líquida tem enxofre adicionado a ele, em seguida, através de uma combinação de calor e pressão, a estrutura interna da borracha muda, tornando-se muito mais forte e mais durável. Chamada de "vulcanização" depois do deus romano do fogo, esse processo de calor permite que as longas cadeias de moléculas do material se unam, tornando-se mais como uma rede de pesca 3D, geometricamente espaçada, forte, resiliente e elástica em qualquer direção. Este cubo de borracha preta tem alguns outros ingredientes para torná-lo ainda mais resistente e resistente à abrasão. O negro de fumo é usado como pigmento e reforço, e é feito pela queima de pneus velhos.
50	vegetal	castanho	50	proj16_vegetable.png	Vegetal	Heamotoxylum Campechianum é o nome científico do bloodwood ou do logwood. Logwood é uma espécie de floração da família das leguminosas, Fabaceae, que é nativa do sul do México e da América Central. Seu nome, bloodwood, é muito apropriado; é utilizado como fonte natural de corante que produz variedades de violetas que também dependem do valor do pH da solução utilizada. Em ambientes acídicos, o corante assume uma cor avermelhada e em ambientes alcalinos, assume tons mais azulados. Corantes Logwood é amplamente utilizado em têxteis e papéis, bem como indicadores de pH. É também uma importante fonte de hemotoxilina, que é usada na histologia para coloração.\r\nO processo de tingimento começa com chips de madeira de imersão e fervura durante duas horas e até durante a noite. As aparas são então coadas antes de colocar o têxtil / lã na água. A intensidade da cor violeta ou outras tonalidades pode ser obtida pela adição de alúmen ou ferro, o que altera o pH da água e, assim, a cor resultante.
37	polímeros	amarelo	37	010_p.png	Polímeros	Este material de aparência despretensiosa é um tecido surpreendentemente de alto desempenho. Gore-Tex é o nome comercial desta membrana de tecido de politetrafluoretileno poroso (PTFE) cuja inércia química e biocompatibilidade significam que é usada para imitar a parede do estômago em operações de hérnia e substituir veias em enxertos vasculares - em pontes aórticas, por exemplo. No entanto Gore-Tex é provavelmente mais conhecido por sua capacidade de nos proteger dos elementos em rainwear respirável. Ao esticar rapidamente o PTFE sob as condições corretas, você pode criar um material microporoso muito forte, durável e à prova d'água que interage de maneira interessante com a água em seus vários estados. A superfície da membrana de PTFE é revestida com mais de 9 bilhões de poros microscópicos por polegada quadrada, e esses poros são aproximadamente 20.000 vezes menores que uma gota de água, mas 700 vezes maior que uma molécula de vapor de umidade. Gotas de água não conseguem penetrar em Gore-Tex, mas o vapor de umidade - suor, por exemplo - pode escapar facilmente. Estas qualidades de inércia química, biocompatibilidade e microporosidade também tornam este material útil como uma ligadura. Esta amostra veio de uma loja de bicicletas, onde foi vendida como uma gaze para vestir lesões no ciclismo: enquanto protege a ferida da chuva, sujeira e substâncias contaminantes, ela ainda permite que ela "respire".
20	composito	preto	20	08_c.png	Composito	Asfalto é o nome genérico dado aos materiais de revestimento de estradas, que são compostos por materiais semelhantes a alcatrão misturados com agregados minerais, como cimento Portland, areia, cascalho ou concreto. No entanto, a palavra 'alcatrão' é usada para descrever um número de substâncias distintas que na verdade não são alcatrão. O alcatrão é uma resina natural refinada ou 'breu', geralmente da madeira e das raízes dos pinheiros, mas estas raramente são encontradas nos nossos pavimentos. De fato, a maior parte do "alcatrão" no asfalto é o betume, que pode ser encontrado na natureza como uma forma semi-sólida de petróleo; mas é mais comumente um bi-produto da produção de petróleo bruto por destilação. O folclore popular sustenta que o asfalto foi inventado pelo escocês John McAdam, mas, na verdade, um topógrafo do condado chamado Edgar Hooley era o homem cujo encontro acidental com um derramamento industrial fazia com que as superfícies das estradas furassem. McAdam tinha inventado superfícies de pedra esmagada, que eram boas para carruagens puxadas por cavalos, mas quando os carros se tornaram populares, estas superfícies eram inadequadas. A história diz que Hooley estava inspecionando em Derby e viu uma seção lisa da estrada perto de uma ferraria. Quando ele investigou, ele foi informado de que um barril de alcatrão havia caído na estrada e resíduos de escória das fornalhas foram derramados sobre ele para limpar a bagunça ... e assim asfalto nasceu.
15	cerâmica	branco	15	02_ce.png	Cerâmica	This rectangular sample of tough white ceramic looks like plastic, but its weight and the glassy chink sound it makes when two pieces are tapped together, give away that it is not. However this is not your ordinary, china-mug-type ceramic. One of the distinctive features of traditional ceramics is that it cannot be worked or shaped once it has been fired, but this material can be machined with ordinary metal cutting tools. The kind of ceramic you would have in your kitchen is obviously very brittle – imagine trying to cut that with an electric saw! This material is a special engineered glass-ceramic, produced in two stages by first casting glass, and then heating that glass with additives that control the way it crystallises. This causes it to have some of the properties of a ceramic, and some of a glass. Although it might seem counter-intuitive, this combination of materials makes the final material much tougher and more shatter-proof than either a standard glass or ceramic, as well as yielding interesting properties like biocompatibility (glass ceramics can be used as scaffolding for tissue engineering). Because glass-ceramics can withstand very high temperatures and are resistant to chemical attack, this material can be used to make very tough parts for tasks that metals and polymers cannot manage.
38	polímeros	vermelho	38	015_p.png	Polímeros	Estes blocos fundidos de resina de poliuretano lembram doces cozidos em textura e cor. Este poliuretano transparente laranja é produzido em forma líquida para que possa ser derramado em moldes. Sendo altamente impressionável, até o mais fino detalhe do molde será exibido no produto acabado. Esses líquidos espessos, viscosos e pegajosos foram chamados de "resinas sintéticas" porque alteram a viscosidade de uma forma que é uma reminiscência de resinas vegetais naturais, como a mastique, que se formam com o tempo. Independentemente do produto final ou mesmo do tipo de poliuretano que você está usando, a maneira como você usa resinas de poliuretano é sempre a mesma: as matérias-primas vêm em duas partes, um isocianato líquido (um químico muito reativo derivado do petróleo) e um poliol (um álcool de cadeia longa), que são misturados a uma proporção especificada para criar um líquido reagente, que é então vertido em um molde ou em uma superfície e deixado até que ele cure para formar um objeto sólido. As propriedades mecânicas das resinas de poliuretano não são muito afetadas pela luz ultravioleta, mas muitas vezes descoloram com o tempo quando expostas à luz solar. Este material contém estabilizadores químicos que o tornam resistente a raios UV e não quebradiço. Resinas de poliuretano são usadas para produzir uma enorme variedade de coisas, de tintas e adesivos a plásticos.
\.


--
-- TOC entry 2205 (class 0 OID 24900)
-- Dependencies: 193
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Notification" (id_notification, text_notification, date_notification, insert, id_user) FROM stdin;
5	Nova partilha do mundo	Agora mesmo	yes	3
6	Nova partilha do mundo	Agora mesmo	yes	3
7	Resposta à pergunta número 1	Agora mesmo	yes	1
8	Resposta à pergunta número 1	Agora mesmo	yes	1
9	Resposta à pergunta número 1	Agora mesmo	yes	1
10	Resposta à pergunta número 1	Agora mesmo	yes	1
11	Resposta à pergunta número 1	Agora mesmo	yes	1
2	Novas curiosidades disponíveis	Há 30 minutos	yes	1
3	Utilizador x respondei à tua pergunta	Há 1 hora	yes	1
1	Foi adicionado um novo material	Há 2 minutos	yes	1
4	A sua BiAMa foi criada pelo utilizador lkjhgfd	Agora mesmo	yes	11
\.


--
-- TOC entry 2201 (class 0 OID 24796)
-- Dependencies: 189
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id_question, text_question, likes_question, forum_type) FROM stdin;
3	Como pesquisar por categoria?	0	forum2
1	Os materiais podem estar associados a mais do que uma categoria?	1	forum1
2	Sempre que pesquisa por um material, pode fazer por categoria,certo?	1	forum2
4	Sabe como obter o QR Code?	1	forum3
0	Os materiais podem estar associados a uma categoria?	0	forum2
\.


--
-- TOC entry 2200 (class 0 OID 24783)
-- Dependencies: 188
-- Data for Name: Share; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Share" (forum_type, title, image, "descriptionShare") FROM stdin;
forum1	ws3	ws_07.png	Ímãs de ferrita já foram os mais fortes ímãs até que ímans de terras raras foram descobertos, e em muitos casos seus primos mais poderosos os substituíram. No entanto, este ímã de ferrite é muito menos frágil e é consideravelmente mais barato e mais fácil de se obter do que magnetos de terras raras, e é feito de uma mistura de um material cerâmico e óxido de ferro (III). Algum minério de ferro (magnetita) é magnético a partir do momento em que é extraído do solo, mas este óxido de ferro vem em grande parte da hematita de minério, que não é fortemente magnética e precisa ter seu campo magnético aprimorado durante o processo de produção. Para isso, os materiais constituintes do imã são aquecidos a uma temperatura crítica e deixados arrefecer na presença de um campo magnético. Óxidos de ferro magnéticos têm uma longa história de uso por humanos com magnetodones magnetizados, usados ​​na navegação, como bússolas primitivas desde o século XII. As bússolas funcionam pelo princípio de que a própria terra tem um campo magnético, e a agulha ou ponteira de movimento livre magnetizada alinha-se com esse campo, com uma extremidade apontando para o pólo sul magnético e a outra para o pólo norte magnético.
forum1	ws4	ws_08.png	Este bule do século XVIII parece bastante caricatural em sua forma, com seus pequenos pés enrolados, seu corpo cinza liso, abaulante e opaco, um bico grande, facetado e elaboradamente decorado e um grande cabo de madeira falsa. Além de alguns pequenos pedaços de embutimento de osso no cabo e um pouco de concha perolada na tampa, este bule é em grande parte feito de estanho oxidado opaco e escuro; uma liga de estanho com chumbo, antimônio, bismuto e cobre. Originalmente pensamos que ele era feito de britannia metal, uma variante da liga de estanho que é semelhante em cor e composição a outros pewters, mas contém uma proporção relativamente alta de antimônio (até 6%), o que torna mais difícil, mais forte e mais fácil trabalhar. No entanto, pensa-se que a britannia metal foi inventada por James Vickers em Sheffield, 1769. Este bule tem um carimbo de data no fundo que sugere que foi fabricado em Sheffield, 1760. Devido à sua idade, é pouco provável que seja Britannia. ware e mais provável que seja um pedaço de pewterware mais antigo, levemente com chumbo. Isso faz com que esse bule particular seja um espécime bastante interessante, pois logo após sua fabricação, os estanho geralmente pararam de fabricar bules com ligas de chumbo, preferindo o metal britannia. O chumbo é tóxico se inalado ou digerido em altos níveis de exposição, pois se acumula nos tecidos moles e ossos, danificando o sistema nervoso e interferindo na produção de glóbulos vermelhos. No entanto, o chumbo não foi banido do estanho por motivos de saúde até a década de 1970. É mais provável que os peltre se distanciaram gradualmente das ligas com chumbo e dos pewter baseados em antimônio, porque permitiram uma nova técnica de processamento. Vickers descobriu que a adição de antimônio tornava o metal britannia forte o suficiente para formar uma folha de metal. Em vez de ser moldado em moldes caros e esculpido para acrescentar detalhes intricados, como provavelmente era este bule, o metal podia ser cortado, formado à mão ou girado, e depois soldado junto em um processo muito mais rápido e barato. Mesmo antes do desenvolvimento do metal britannia, as ligas de estanho de "metal fino" usadas para artigos de mesa tendiam a ter um conteúdo de chumbo relativamente baixo e alto teor de estanho para se assemelharem à prata. Você pode estar familiarizado com a prata deste pobre homem dos estojos de fundição de baixa fusão (e agora todos livres de chumbo) usados ​​às vezes na fabricação de joias. Se assim for, você saberá que, quando lançado pela primeira vez, muitas vezes sai brilhante e brilhante, não cinza e sem graça como esta peça. Este bule provavelmente teria sido vendido altamente polido para imitar a prata, mas ficou manchado ao longo do tempo para se tornar o atual tom cinza-azulado.
forum3	ws2	star.png	
forum2	ws5	ws_05.png	Estes óculos contêm lentes que podem ser auto-ajustadas pelo usuário à sua prescrição, e foram desenvolvidas como uma solução de cuidados com os olhos de baixo custo e acessível para pessoas em países em desenvolvimento. A lente consiste de duas membranas, entre as quais o óleo de silicone pode ser bombeado com as seringas no lado dos quadros. À medida que o fluido é bombeado para dentro ou para fora, a distância focal da lente é alterada, o que significa que a lente pode ser ajustada aos requisitos específicos do olho. As seringas podem então ser removidas. O inventor desses óculos foi indicado para o Prêmio Europeu de Invenção de 2011.
forum1	ws1	ws_01.png	As esponjas do mar são animais marinhos que são colhidos pelos seus "esqueletos" fibrosos que são utilizados como ferramentas de limpeza, enchimento e muito mais. Esponjas sintéticas são feitas de polímeros plásticos altamente absorventes. Esponjas naturais tendem a reter mais água.
forum1	ws2	ws_06.png	A mitologia grega atribui o primeiro favo de mel feito pelo homem ao inventor Dédalo, que se diz ter feito um de ouro usando o método da cera perdida há mais de 3000 anos. A geometria do favo de mel, que ocorre naturalmente nos ossos e nas colméias, dá a ele uma rigidez muito boa para o seu peso e, como resultado, é freqüentemente encontrado em aplicações de aeronaves. Este favo de mel em particular é (provavelmente) feito de um papel de aramida resistente a altas temperaturas. As aramidas são um grupo de polímeros sintéticos muito fortes e resistentes ao calor, incluindo o Kevlar, que são usados em aplicações aeroespaciais e militares para blindagens balísticas, em pneus de bicicletas e como substituto de amianto.
forum3	ws0	ws_09.png	Os fabricantes deste talheres biodegradáveis ​​não dizem exatamente como é feito, mas é provável que ele tenha sido moldado por injeção a partir de um amido termoplástico ou base de celulose misturado com um polímero derivado de combustíveis fósseis ou biocombustíveis. Todos os plásticos são biodegradáveis, dado tempo suficiente. Para serem classificados como compostáveis, os plásticos precisam se biodegradar dentro de um prazo estrito e padronizado, mas os produtores de materiais e os gerentes de resíduos ainda estão lutando para definir um prazo para a biodegradabilidade. Como tal, significa muito pouco simplesmente afirmar que um material é "biodegradável" sem especificar as condições precisas necessárias para a sua biodegradação. O produtor deste garfo biodegradável declara que seus produtos são biodegradáveis ​​por compostagem; alguns têm que ser compostados internamente e outros biodegradam-se no solo. Esses tipos de tecnologias foram desenvolvidos para tentar lidar com o problema muito disperso e visível dos resíduos plásticos no mar e espalhados pela paisagem. Eles nem sempre são eficazes, uma vez que esses materiais biodegradáveis ​​geralmente acabam em aterros sanitários, onde a biodegradação é em grande parte anaeróbica e os plásticos que se degradam nessas condições formam gás metano. Idealmente, estes plásticos seriam retirados do fluxo de resíduos e compostados em casa. Isso não é facilitado pelo fato de que o garfo não tem marcações nele para mostrar que ele é biodegradável ou compostável.
\.


--
-- TOC entry 2196 (class 0 OID 24613)
-- Dependencies: 184
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."User" (id, name, email, birthdate, image, username, password) FROM stdin;
1	Sara	sara@gmail.com	01/01/1999	IMG_0039.JPG	sara	sara
2	zeze	zeze@gmail.com	12/12/1993	noImage	zeze	zeze
\.


--
-- TOC entry 2217 (class 0 OID 0)
-- Dependencies: 195
-- Name: sequence_notification; Type: SEQUENCE SET; Schema: public; Owner: BiAMa
--

SELECT pg_catalog.setval('public.sequence_notification', 3, true);


--
-- TOC entry 2218 (class 0 OID 0)
-- Dependencies: 192
-- Name: sequence_start_0; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sequence_start_0', 7, true);


--
-- TOC entry 2219 (class 0 OID 0)
-- Dependencies: 194
-- Name: sequence_user; Type: SEQUENCE SET; Schema: public; Owner: BiAMa
--

SELECT pg_catalog.setval('public.sequence_user', 1, false);


--
-- TOC entry 2065 (class 2606 OID 24818)
-- Name: Answer_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_pkey" PRIMARY KEY (id_answer, id_question);


--
-- TOC entry 2059 (class 2606 OID 24850)
-- Name: Curiosity_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Curiosity"
    ADD CONSTRAINT "Curiosity_pkey" PRIMARY KEY (image);


--
-- TOC entry 2067 (class 2606 OID 24974)
-- Name: Favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id_favorite, user_id);


--
-- TOC entry 2047 (class 2606 OID 24770)
-- Name: Forum_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Forum"
    ADD CONSTRAINT "Forum_pkey" PRIMARY KEY (type_forum);


--
-- TOC entry 2057 (class 2606 OID 24644)
-- Name: Library_Material_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_Material"
    ADD CONSTRAINT "Library_Material_pkey" PRIMARY KEY (library_id, material_id);


--
-- TOC entry 2055 (class 2606 OID 24627)
-- Name: Library_User_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_User"
    ADD CONSTRAINT "Library_User_pkey" PRIMARY KEY (library_id, user_id);


--
-- TOC entry 2043 (class 2606 OID 24639)
-- Name: Material_code_key; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT "Material_code_key" UNIQUE (code);


--
-- TOC entry 2063 (class 2606 OID 24852)
-- Name: Question_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_pkey" PRIMARY KEY (id_question);


--
-- TOC entry 2061 (class 2606 OID 24848)
-- Name: Share_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Share"
    ADD CONSTRAINT "Share_pkey" PRIMARY KEY (image);


--
-- TOC entry 2051 (class 2606 OID 24880)
-- Name: User_pkey1; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey1" PRIMARY KEY (id);


--
-- TOC entry 2053 (class 2606 OID 24622)
-- Name: User_username_key; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (username);


--
-- TOC entry 2049 (class 2606 OID 24612)
-- Name: id; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library"
    ADD CONSTRAINT id PRIMARY KEY (id_library);


--
-- TOC entry 2069 (class 2606 OID 24986)
-- Name: id_notification; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT id_notification PRIMARY KEY (id_notification);


--
-- TOC entry 2045 (class 2606 OID 16420)
-- Name: material_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT material_pkey PRIMARY KEY (id);


--
-- TOC entry 2076 (class 2606 OID 24853)
-- Name: Answer_idQuestion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_idQuestion_fkey" FOREIGN KEY (id_question) REFERENCES public."Question"(id_question);


--
-- TOC entry 2073 (class 2606 OID 24778)
-- Name: Curiosity_forum_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Curiosity"
    ADD CONSTRAINT "Curiosity_forum_type_fkey" FOREIGN KEY (forum_type) REFERENCES public."Forum"(type_forum);


--
-- TOC entry 2077 (class 2606 OID 24834)
-- Name: Favorite_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_material_id_fkey" FOREIGN KEY (material_id) REFERENCES public."Material"(id);


--
-- TOC entry 2078 (class 2606 OID 24975)
-- Name: Favorite_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id);


--
-- TOC entry 2070 (class 2606 OID 24771)
-- Name: Forum_library_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Forum"
    ADD CONSTRAINT "Forum_library_id_fkey" FOREIGN KEY (library_id) REFERENCES public."Library"(id_library);


--
-- TOC entry 2071 (class 2606 OID 24645)
-- Name: Library_Material_library_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_Material"
    ADD CONSTRAINT "Library_Material_library_id_fkey" FOREIGN KEY (library_id) REFERENCES public."Library"(id_library);


--
-- TOC entry 2072 (class 2606 OID 24650)
-- Name: Library_Material_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_Material"
    ADD CONSTRAINT "Library_Material_material_id_fkey" FOREIGN KEY (material_id) REFERENCES public."Material"(id);


--
-- TOC entry 2075 (class 2606 OID 24806)
-- Name: Question_forum_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_forum_type_fkey" FOREIGN KEY (forum_type) REFERENCES public."Forum"(type_forum);


--
-- TOC entry 2074 (class 2606 OID 24791)
-- Name: Share_forum_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Share"
    ADD CONSTRAINT "Share_forum_type_fkey" FOREIGN KEY (forum_type) REFERENCES public."Forum"(type_forum);


--
-- TOC entry 2215 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-09-09 11:10:12

--
-- PostgreSQL database dump complete
--

