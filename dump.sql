--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."urls" (
    "id" integer NOT NULL,
    "url" "text" NOT NULL,
    "shortUrl" "text" NOT NULL,
    "visitCount" bigint DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT "now"() NOT NULL
);


-- ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urlsUsers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."urlsUsers" (
    "id" integer NOT NULL,
    "urlId" integer NOT NULL,
    "userid" integer NOT NULL
);


-- ALTER TABLE public."urlsUsers" OWNER TO postgres;

--
-- Name: urlsUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "public"."urlsUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public."urlsUsers_id_seq" OWNER TO postgres;

--
-- Name: urlsUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "public"."urlsUsers_id_seq" OWNED BY "public"."urlsUsers"."id";


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "public"."urls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "public"."urls_id_seq" OWNED BY "public"."urls"."id";


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."users" (
    "id" integer NOT NULL,
    "name" character varying(127) NOT NULL,
    "email" character varying(255) NOT NULL,
    "password" character varying(63) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT "now"() NOT NULL
);


-- ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "public"."users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "public"."users_id_seq" OWNED BY "public"."users"."id";


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."urls" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."urls_id_seq"'::"regclass");


--
-- Name: urlsUsers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."urlsUsers" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."urlsUsers_id_seq"'::"regclass");


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."users" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."users_id_seq"'::"regclass");


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."urls" ("id", "url", "shortUrl", "visitCount", "createdAt") FROM stdin;
4	https://www.spitfireaudio.com/	sLz4BsKqAs	0	2022-10-15 16:59:16.141022
5	https://www.native-instruments.com/en/	vTvo0GwII8	1	2022-10-15 17:40:12.099912
6	https://www.native-instruments.com/en/	Qz3eiFa9PK	1	2022-10-15 17:40:14.829876
7	https://www.native-instruments.com/en/	EVZfG0uVYG	1	2022-10-15 17:40:15.083482
8	https://www.native-instruments.com/en/	kLfh3EDmpN	1	2022-10-15 17:43:11.436384
9	https://www.native-instruments.com/en/	cofZQ7SCPi	1	2022-10-15 17:44:34.558452
11	https://www.native-instruments.com/en/	HEMYTkUgur	1	2022-10-05 18:00:53.589487
12	https://www.spitfireaudio.com/	rFEaVw4Ud5	1	2022-10-05 18:40:07.562501
18	https://www.spitfireaudio.com/	mPuA9Dvvmc	0	2022-10-05 18:42:39.339425
19	https://www.spitfireaudio.com/	viRimqCnt3	3	2022-10-05 18:43:02.572126
20	https://www.spitfireaudio.com/.br	ZqdVU9mTPM	1	2022-10-05 18:50:17.881344
21	https://www.spitfireaudio.com/.en	el87DhCEsL	2	2022-10-05 18:50:31.870912
22	https://www.spitfireaudio.com/.dd	1uyAUwBYVt	0	2022-10-05 18:50:45.820033
23	https://www.steinberger.net/	tAYlHFggA7	1	2022-10-05 18:50:55.452042
24	https://www.spitfireaudio.com/	ltaQ9lM2Sv	8	2022-10-05 18:58:26.288822
\.


--
-- Data for Name: urlsUsers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."urlsUsers" ("id", "urlId", "userid") FROM stdin;
4	7	6
5	8	6
6	9	6
8	11	6
9	12	6
15	18	13
16	19	14
17	20	14
18	21	14
19	22	14
20	23	14
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."users" ("id", "name", "email", "password", "createdAt") FROM stdin;
1	adm	adm@adm.com	adm	2022-08-03 13:05:35.234457
2	clei	qwe@gmail.com	aaaa	2022-08-03 14:39:42.650992
3	clei	qwe@driven.com	$2a$10$kzZ232p6Di/TtS5PHXDPAuZT5n.bPAp8STN62DIbL.dlCLMmDZPtW	2022-10-15 14:40:32.663266
4	clei	qwe@driven.com.br	$2a$10$NxN.Hz5LUXcBreBpnJW75.v8UxRW9ZBcQiA7HBN27yN6LNoVqS/7W	2022-10-15 14:42:25.698262
5	clei	qwe@drivn.com	$2a$10$LFc2JzQPk3nvvnz3zcMreOhsaa7vtrKboKPFoimTqqLp1uwryT.c.	2022-10-15 14:42:39.605298
6	qwerq	q@w.com	$2a$10$omSnAts0EkwkyWt2ljhq4uoVwqZ9FTv0rpzS2uJuu4rOAoUBMHzl.	2022-10-15 16:05:00.159133
7	qwera	a@e.com	$2a$10$0TSOXwuN7vmm9m0sAEp2YOW7Y8w5i3DB3A0jKKHr9Rmda4qVS6jWG	2022-10-15 20:00:19.847537
8	qwerq	q@e.com	$2a$10$MuhbccBQ.0e2m38O3LmVEutUE9gLkYXSijhP7jDTIrg/bSMfDkhkO	2022-10-15 20:04:45.827688
9	qwerm	mm@m.com	$2a$10$4TWpxKh7CPTSXIFk.ED.hOoFS.K.lX95UUvrK2ctwRQQAXHT1P9lO	2022-10-15 20:10:54.749053
10	qwerrr	qwerr@g.com	$2a$10$mmd2ss.I/51rjQXDkk33l.vB5E8SXCBzOIr9Whxpt4GOe3ADhPSg2	2022-10-15 20:10:55.230208
11	qwerrr	qwerrr@g.com	$2a$10$f9Gq8kvAK.YBVYJDU/tfYe.toOMBVC5umhrNuThBEwBSl7SITyCS2	2022-10-15 20:11:19.279046
12	qwerrrr	qwerrrr@g.com	$2a$10$yw4kxMI7l3yJGsOkSkJ6n.Ca2tx.UqBUSb466unJEBnmWBNE6LkVu	2022-10-15 15:15:53.263773
13	qwerg	qwer@g.com	$2a$10$T2GWaSTjCfcTe6.guXQGwuA5WwJtoidqnKtrXoZVNvVCI53D6X7EO	2022-10-15 18:42:01.897856
14	qqwer	qqwer@g.com	$2a$10$oJmRQLIjPsORUPkDlaHo1.LNKd1uLToJ/hTq57NiuYZ8MVSSZSZcO	2022-10-15 18:42:10.265946
\.


--
-- Name: urlsUsers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."urlsUsers_id_seq"', 53, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."urls_id_seq"', 56, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 47, true);


--
-- Name: urlsUsers urlsUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."urlsUsers"
    ADD CONSTRAINT "urlsUsers_pkey" PRIMARY KEY ("id");


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."urls"
    ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("id");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: urlsUsers urlsUsers_urlId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."urlsUsers"
    ADD CONSTRAINT "urlsUsers_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "public"."urls"("id");


--
-- Name: urlsUsers urlsUsers_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."urlsUsers"
    ADD CONSTRAINT "urlsUsers_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."users"("id");


--
-- PostgreSQL database dump complete
--