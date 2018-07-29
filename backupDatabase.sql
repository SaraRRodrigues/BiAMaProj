--
-- PostgreSQL database cluster dump
--

-- Started on 2018-07-29 21:43:49

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE "BiAMa";
ALTER ROLE "BiAMa" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5c775bf11bd54ab2d00814fb29c370064' VALID UNTIL 'infinity';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md524bb002702969490e41e26e1a454036c';






--
-- Database creation
--

CREATE DATABASE "BiAMaDB" WITH TEMPLATE = template0 OWNER = "BiAMa";
REVOKE ALL ON DATABASE template1 FROM PUBLIC;
REVOKE ALL ON DATABASE template1 FROM postgres;
GRANT ALL ON DATABASE template1 TO postgres;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect "BiAMaDB"

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

-- Started on 2018-07-29 21:43:49

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
-- TOC entry 2218 (class 0 OID 0)
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
    "likesAnswer" integer
);


ALTER TABLE public."Answer" OWNER TO "BiAMa";

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


ALTER TABLE public."Curiosity" OWNER TO "BiAMa";

--
-- TOC entry 191 (class 1259 OID 24824)
-- Name: Favorite; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Favorite" (
    id_favorite integer NOT NULL,
    user_id integer NOT NULL,
    material_id integer,
    question_id integer
);


ALTER TABLE public."Favorite" OWNER TO "BiAMa";

--
-- TOC entry 182 (class 1259 OID 16458)
-- Name: Forum; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Forum" (
    type_forum text NOT NULL,
    library_id integer NOT NULL
);


ALTER TABLE public."Forum" OWNER TO "BiAMa";

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


ALTER TABLE public."Library" OWNER TO "BiAMa";

--
-- TOC entry 186 (class 1259 OID 24640)
-- Name: Library_Material; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Library_Material" (
    library_id integer NOT NULL,
    material_id integer NOT NULL
);


ALTER TABLE public."Library_Material" OWNER TO "BiAMa";

--
-- TOC entry 185 (class 1259 OID 24623)
-- Name: Library_User; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Library_User" (
    library_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Library_User" OWNER TO "BiAMa";

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


ALTER TABLE public."Material" OWNER TO "BiAMa";

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


ALTER TABLE public.sequence_notification OWNER TO "BiAMa";

--
-- TOC entry 193 (class 1259 OID 24900)
-- Name: Notification; Type: TABLE; Schema: public; Owner: BiAMa
--

CREATE TABLE public."Notification" (
    id_notification bigint DEFAULT nextval('public.sequence_notification'::regclass) NOT NULL,
    text_notification text,
    date_notification text,
    insert text
);


ALTER TABLE public."Notification" OWNER TO "BiAMa";

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
    "likesQuestion" integer,
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


ALTER TABLE public."Share" OWNER TO "BiAMa";

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


ALTER TABLE public.sequence_user OWNER TO "BiAMa";

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


ALTER TABLE public."User" OWNER TO "BiAMa";

--
-- TOC entry 2204 (class 0 OID 24811)
-- Dependencies: 190
-- Data for Name: Answer; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Answer" (id_answer, id_question, text_answer, "likesAnswer") FROM stdin;
2	2	Realmente, tem mais sentido.	0
1	1	Este material pode estar incluído em diferentes categorias.	1
3	1	Mas pensando nisso...	0
4	1	fdsf	0
5	1	Save meee	0
6	1	\N	0
7	0	dsada	0
\.


--
-- TOC entry 2201 (class 0 OID 24761)
-- Dependencies: 187
-- Data for Name: Curiosity; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Curiosity" (forum_type, title, image, "descriptionCuriosity") FROM stdin;
forum1	Plastic-fish	plastic_6.png	Este material é feito de escamas de peixe compactadas que são aquecidas sob pressão, criando um composto sólido. Todo mundo que pega esse material, uma vez dito que é feito de escamas de peixe, sempre o cheira. Não tem cheiro de peixe. Realmente não cheira nada - o processo de fabricação esteriliza completamente a balança, portanto não há odor residual nem essência do peixe restante.
forum2	Projeto-animal	proj1_animal.png	Este infeliz escorpião é sepultado em uma bolha de plástico transparente com uma base azul perolada e está sendo usado para pesar papéis, ou como um ornamento ligeiramente alarmante. Está preso a um disco de feltro sintético para proteger sua mesa. O plástico é uma resina de fundição líquida sintética de duas partes - geralmente acrílico ou poliuretano. Em seu estado líquido, é um monômero, que é misturado com seu agente químico de cura ou catalisador, e vertido em um molde contendo o escorpião. Como a resina endurece, "polimeriza" em um polímero. A reação exotérmica química faz com que o plástico aqueça durante a cura, tornando a maioria das resinas de fundição impróprias para cera ou outros objetos de baixo ponto de fusão. Pouco antes de a resina clara ficar dura, o fabricante colocaria outra camada fina contendo pigmento azul e algum tipo de pó perolado, para dar ao peso de papel aquele efeito no fundo do mar. O molde usado para a forma de bolha foi provavelmente feito de borracha de silicone, o que permite que o objeto se torne claro e brilhante,\r\nsem necessidade de polimento. A resina não é uma substância agradável para se trabalhar, pois libera vapores químicos irritantes que são muito fedorentos. Os tipos anteriores de resina tendiam a ficar amarelados, frágeis ou turvos com a idade e a exposição aos raios UV durante o dia, arruinando muitos monitores de museus, mas formulações mais modernas permanecerão claras e duras indefinidamente.
\.


--
-- TOC entry 2205 (class 0 OID 24824)
-- Dependencies: 191
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Favorite" (id_favorite, user_id, material_id, question_id) FROM stdin;
1	1	\N	2
2	1	3	-1
3	1	\N	2
4	1	\N	2
5	1	\N	2
6	1	\N	2
7	1	\N	2
8	1	\N	2
9	1	\N	2
10	1	\N	2
11	1	\N	\N
12	1	\N	2
13	1	\N	2
14	1	\N	2
\.


--
-- TOC entry 2196 (class 0 OID 16458)
-- Dependencies: 182
-- Data for Name: Forum; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Forum" (type_forum, library_id) FROM stdin;
forum1	1
forum2	2
forum3	3
forum4	4
forum5	5
\.


--
-- TOC entry 2197 (class 0 OID 24605)
-- Dependencies: 183
-- Data for Name: Library; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Library" (id_library, location, description, "locationDescription") FROM stdin;
2	embed?pb=!1m18!1m12!1m3!1d3112.171639197157!2d-9.140899049968251!3d38.73682336389977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933a24aa81f17%3A0x880c7c731a54423!2sInstituto+Superior+T%C3%A9cnico!5e0!3m2!1spt-PT!2spt!4v1529528847654	Com os avanços da tecnologia, surge a necessidade de criar bibliotecas digitais de acesso aberto. Este tipo de bibliotecas são muito úteis no que diz respeito à deslocação, pois não é necessário o utilizador se deslocar para pesquisar algum material, projeto de material, entre outros. O nome BiAMa, tem como significado "Biblioteca Aberta de Materiais".	Instituto Superior Técnico de Lisboa
1	embed?pb=!1m18!1m12!1m3!1d6223.537995391765!2d-9.19961064513007!3d38.74606284620067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1eccd41dcab0e3%3A0x2f691f9dce18f0f5!2sEscola+Superior+de+Educa%C3%A7%C3%A3o+de+Lisboa%2C+Lisboa!5e0!3m2!1spt-PT!2spt!4v1529528684919	Com os avanços da tecnologia, surge a necessidade de criar bibliotecas digitais de acesso aberto. Este tipo de bibliotecas são muito úteis no que diz respeito à deslocação, pois não é necessário o utilizador se deslocar para pesquisar algum material, projeto de material, entre outros. O nome BiAMa, tem como significado "Biblioteca Aberta de Materiais".	Escola Superior de Educação de Lisboa
3	\N	\N	\N
4	\N	\N	\N
5	\N	\N	\N
\.


--
-- TOC entry 2200 (class 0 OID 24640)
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
3	45
2	46
2	47
1	48
2	49
1	50
2	12
\.


--
-- TOC entry 2199 (class 0 OID 24623)
-- Dependencies: 185
-- Data for Name: Library_User; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Library_User" (library_id, user_id) FROM stdin;
2	1
\.


--
-- TOC entry 2195 (class 0 OID 16413)
-- Dependencies: 181
-- Data for Name: Material; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Material" (id, type, color, code, name, category, description) FROM stdin;
24	composite	white	24	016_c.png	Composite	cenas1
23	composite	beige	23	014_c.png	Composite	cenas1
22	composite	white	22	015_c.png	Composite	cenas1
21	composite	green	21	012_c.png	Composite	cenas1
20	composite	black	20	08_c.png	Composite	cenas1
19	composite	beige	19	05_c.png	Composite	cenas1
18	composite	blue	18	04_c.png	Composite	cenas1
17	composite	black	17	010_c.png	Composite	cenas1
16	ceramic	white	16	04_ce.png	Ceramic	cenas1
15	ceramic	white	15	02_ce.png	Ceramic	cenas1
14	ceramic	orange	14	01_ce.png	Ceramic	cenas1
13	ceramic	gray	13	00_ce.png	Ceramic	cenas1
12	animal	white	12	an_02.png	Animal	cenas1
11	animal	pink	11	an_04.png	Animal	cenas1
10	animal	green	10	an_00.png	Animal	cenas1
8	animal	blue	8	an_01.png	Animal	cenas1
7	vegetable	beige	7	01_v.png	Vegetable	cenas1
6	polymers	white	6	027_p.png	Polymers	cenas1
5	mineral	blue	5	03_m.png	Mineral	cenas1
47	vegetable	white	47	proj1_vegetable.png	Vegetable	cenas1
1	animal	black	1\r\n	an_03.png	Animal	cenas1
2	ceramic	white	2	02_ce.png	Ceramic	cenas1
4	metal	gray	4	08_me.png	Metal	cenas1
3	composite	black	3	03_c.png	Composite	cenas1
50	vegetable	brown	50	proj16_vegetable.png	Vegetable	cenas1
49	vegetable	beige	49	proj14_vegetable.png	Vegetable	cenas1
48	vegetable	beige	48	proj9_vegetable.png	Vegetable	cenas1
46	vegetable	brown	46	02_v.png	Vegetable	cenas1
45	vegetable	brown	45	00_v.png	Vegetable	cenas1
44	polymers	yellow	44	031_p.png	Polymers	cenas1
38	polymers	red	38	015_p.png	Polymers	cenas1
37	polymers	yellow	37	010_p.png	Polymers	cenas1
36	polymers	gray	36	02_p.png	Polymers	cenas1
35	mineral	gray	35	07_m.png	Mineral	cenas1
34	mineral	diamond	34	011_m.png	Mineral	cenas1
33	mineral	beige	33	08_m.png	Mineral	cenas1
32	mineral	gray	32	06_m.png	Mineral	cenas1
43	polymers	white	43	021_p.png	Polymers	cenas1
42	polymers	brown	42	026_p.png	Polymers	cenas1
41	polymers	gray	41	024_p.png	Polymers	cenas1
40	polymers	gray	40	019_p.png	Polymers	cenas1
39	polymers	orange	39	018_p.png	Polymers	cenas1
31	mineral	green	31	01_m.png	Mineral	cenas1
30	mineral	beige	30	02_m.png	Mineral	cenas1
29	metal	gray	29	028_me.png	Metal	cenas1
28	metal	yellow	28	027_me.png	Metal	cenas1
27	metal	gray	27	026_me.png	Metal	cenas1
26	metal	gray	26	017_me.png	Metal	cenas1
25	metal	brown	25	011_me.png	Metal	cenas1
\.


--
-- TOC entry 2207 (class 0 OID 24900)
-- Dependencies: 193
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Notification" (id_notification, text_notification, date_notification, insert) FROM stdin;
1	Foi adicionado um novo material	Há 2 minutos	yes
2	Novas curiosidades disponíveis	Há 30 minutos	yes
3	Utilizador x respondei à tua pergunta	Há 1 hora	yes
\.


--
-- TOC entry 2203 (class 0 OID 24796)
-- Dependencies: 189
-- Data for Name: Question; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Question" (id_question, text_question, "likesQuestion", forum_type) FROM stdin;
1	Os materiais podem estar associados a mais do que uma categoria?	0	forum1
0	Os materiais podem estar associados a uma categoria?	0	forum3
2	Sempre que pesquisa por um material, pode fazer por categoria,certo?	2	forum2
3	Como pesquisar por categoria?	2	forum4
\.


--
-- TOC entry 2202 (class 0 OID 24783)
-- Dependencies: 188
-- Data for Name: Share; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."Share" (forum_type, title, image, "descriptionShare") FROM stdin;
forum1	ws0	ws_00.png	Cenas0
forum1	ws3	ws_03.png	Cenas3
forum1	ws2	ws_02.png	Cenas2
forum1	ws1	ws_01.png	Cenas1
forum1	ws4	ws_04.png	Cenas4
forum2	ws5	ws_05.png	Cenas5
\.


--
-- TOC entry 2198 (class 0 OID 24613)
-- Dependencies: 184
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: BiAMa
--

COPY public."User" (id, name, email, birthdate, image, username, password) FROM stdin;
1	Sara	sara@gmail.com	01/01/2000	IMG_0039.JPG	sara	sara
\.


--
-- TOC entry 2219 (class 0 OID 0)
-- Dependencies: 195
-- Name: sequence_notification; Type: SEQUENCE SET; Schema: public; Owner: BiAMa
--

SELECT pg_catalog.setval('public.sequence_notification', 3, true);


--
-- TOC entry 2220 (class 0 OID 0)
-- Dependencies: 192
-- Name: sequence_start_0; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sequence_start_0', 7, true);


--
-- TOC entry 2221 (class 0 OID 0)
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
-- TOC entry 2067 (class 2606 OID 24828)
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
-- TOC entry 2069 (class 2606 OID 24904)
-- Name: Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id_notification);


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
-- TOC entry 2045 (class 2606 OID 16420)
-- Name: material_pkey; Type: CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Material"
    ADD CONSTRAINT material_pkey PRIMARY KEY (id);


--
-- TOC entry 2078 (class 2606 OID 24853)
-- Name: Answer_idQuestion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Answer"
    ADD CONSTRAINT "Answer_idQuestion_fkey" FOREIGN KEY (id_question) REFERENCES public."Question"(id_question);


--
-- TOC entry 2075 (class 2606 OID 24778)
-- Name: Curiosity_forum_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Curiosity"
    ADD CONSTRAINT "Curiosity_forum_type_fkey" FOREIGN KEY (forum_type) REFERENCES public."Forum"(type_forum);


--
-- TOC entry 2079 (class 2606 OID 24834)
-- Name: Favorite_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Favorite"
    ADD CONSTRAINT "Favorite_material_id_fkey" FOREIGN KEY (material_id) REFERENCES public."Material"(id);


--
-- TOC entry 2080 (class 2606 OID 24886)
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
-- TOC entry 2073 (class 2606 OID 24645)
-- Name: Library_Material_library_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_Material"
    ADD CONSTRAINT "Library_Material_library_id_fkey" FOREIGN KEY (library_id) REFERENCES public."Library"(id_library);


--
-- TOC entry 2074 (class 2606 OID 24650)
-- Name: Library_Material_material_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_Material"
    ADD CONSTRAINT "Library_Material_material_id_fkey" FOREIGN KEY (material_id) REFERENCES public."Material"(id);


--
-- TOC entry 2071 (class 2606 OID 24628)
-- Name: Library_User_library_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_User"
    ADD CONSTRAINT "Library_User_library_id_fkey" FOREIGN KEY (library_id) REFERENCES public."Library"(id_library);


--
-- TOC entry 2072 (class 2606 OID 24881)
-- Name: Library_User_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Library_User"
    ADD CONSTRAINT "Library_User_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id);


--
-- TOC entry 2077 (class 2606 OID 24806)
-- Name: Question_forum_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Question"
    ADD CONSTRAINT "Question_forum_type_fkey" FOREIGN KEY (forum_type) REFERENCES public."Forum"(type_forum);


--
-- TOC entry 2076 (class 2606 OID 24791)
-- Name: Share_forum_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: BiAMa
--

ALTER TABLE ONLY public."Share"
    ADD CONSTRAINT "Share_forum_type_fkey" FOREIGN KEY (forum_type) REFERENCES public."Forum"(type_forum);


--
-- TOC entry 2217 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-07-29 21:43:52

--
-- PostgreSQL database dump complete
--

\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

-- Started on 2018-07-29 21:43:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2096 (class 0 OID 0)
-- Dependencies: 2095
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 2 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2099 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 1 (class 3079 OID 16384)
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- TOC entry 2100 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- TOC entry 2098 (class 0 OID 0)
-- Dependencies: 7
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-07-29 21:43:53

--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

-- Started on 2018-07-29 21:43:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2095 (class 0 OID 0)
-- Dependencies: 2094
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2098 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2097 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-07-29 21:43:55

--
-- PostgreSQL database dump complete
--

-- Completed on 2018-07-29 21:43:55

--
-- PostgreSQL database cluster dump complete
--

