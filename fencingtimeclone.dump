--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)

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
-- Name: events; Type: TABLE; Schema: public; Owner: abdel_user
--

CREATE TABLE public.events (
    "eventID" integer NOT NULL,
    name character varying(255) NOT NULL,
    capacity integer,
    address character varying(255) NOT NULL,
    "eventDate" date NOT NULL,
    "startTime" timestamp without time zone NOT NULL,
    weapon character varying(5) NOT NULL,
    category character varying(15) NOT NULL,
    "eventGender" character varying(5) NOT NULL
);


ALTER TABLE public.events OWNER TO abdel_user;

--
-- Name: fencers; Type: TABLE; Schema: public; Owner: abdel_user
--

CREATE TABLE public.fencers (
    member_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    club character varying(255),
    birthdate date NOT NULL,
    gender boolean NOT NULL,
    foil_rating character varying(3) DEFAULT 'U'::character varying NOT NULL,
    epee_rating character varying(3) DEFAULT 'U'::character varying NOT NULL,
    saber_rating character varying(3) DEFAULT 'U'::character varying NOT NULL
);


ALTER TABLE public.fencers OWNER TO abdel_user;

--
-- Name: table_name_id_seq; Type: SEQUENCE; Schema: public; Owner: abdel_user
--

ALTER TABLE public.fencers ALTER COLUMN member_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.table_name_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: table_name_id_seq1; Type: SEQUENCE; Schema: public; Owner: abdel_user
--

ALTER TABLE public.events ALTER COLUMN "eventID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.table_name_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: abdel_user
--

COPY public.events ("eventID", name, capacity, address, "eventDate", "startTime", weapon, category, "eventGender") FROM stdin;
1	21st Annual Will Fence For Food & 2025 FenceAthlon	\N	353 Market St, Kaysville, UT 84037 US	2025-01-11	2025-01-11 08:30:00	Foil	Senior	Mixed
\.


--
-- Data for Name: fencers; Type: TABLE DATA; Schema: public; Owner: abdel_user
--

COPY public.fencers (member_id, first_name, last_name, club, birthdate, gender, foil_rating, epee_rating, saber_rating) FROM stdin;
1	Abdelrahman	Abdelgawad	Brooklyn Bridge Fencing Club	2003-06-21	t	C22	C24	U
3	Jakob	Jeffery	Valkyrie Fencing Club	2000-01-27	t	B23	E23	E23
4	Hyrum	Thomson	Wasatch Fencing	2008-05-28	t	D23	D24	U
5	Parker	Christensen	Wasatch Fencing	2005-07-01	t	C23	A22	U
\.


--
-- Name: table_name_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abdel_user
--

SELECT pg_catalog.setval('public.table_name_id_seq', 5, true);


--
-- Name: table_name_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: abdel_user
--

SELECT pg_catalog.setval('public.table_name_id_seq1', 1, true);


--
-- Name: fencers table_name_pkey; Type: CONSTRAINT; Schema: public; Owner: abdel_user
--

ALTER TABLE ONLY public.fencers
    ADD CONSTRAINT table_name_pkey PRIMARY KEY (member_id);


--
-- Name: events table_name_pkey1; Type: CONSTRAINT; Schema: public; Owner: abdel_user
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT table_name_pkey1 PRIMARY KEY ("eventID");


--
-- PostgreSQL database dump complete
--

