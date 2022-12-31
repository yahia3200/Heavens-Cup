PGDMP     -                    z            wc22    15.1 (Debian 15.1-1.pgdg110+1)    15.1 (Debian 15.1-1.pgdg110+1) )    M           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            N           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            O           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            P           1262    16388    wc22    DATABASE     o   CREATE DATABASE wc22 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE wc22;
                postgres    false                        3079    16389 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            Q           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    16415    adminstrators    TABLE     �   CREATE TABLE public.adminstrators (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username text NOT NULL,
    hash text NOT NULL,
    userrole integer DEFAULT 2 NOT NULL
);
 !   DROP TABLE public.adminstrators;
       public         heap    postgres    false    2            �            1259    16456    matches    TABLE     2  CREATE TABLE public.matches (
    team1 uuid NOT NULL,
    team2 uuid NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    start_time timestamp without time zone NOT NULL,
    main_ref uuid NOT NULL,
    line_man_1 uuid NOT NULL,
    line_man_2 uuid NOT NULL,
    stad_id uuid NOT NULL
);
    DROP TABLE public.matches;
       public         heap    postgres    false    2            �            1259    16436    referee    TABLE     �   CREATE TABLE public.referee (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ref_role integer NOT NULL,
    ref_name text NOT NULL
);
    DROP TABLE public.referee;
       public         heap    postgres    false    2            �            1259    16492    reservations    TABLE     {   CREATE TABLE public.reservations (
    chair_id integer NOT NULL,
    match_id uuid NOT NULL,
    user_id uuid NOT NULL
);
     DROP TABLE public.reservations;
       public         heap    postgres    false            �            1259    16446    stadiums    TABLE     �   CREATE TABLE public.stadiums (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    stad_name text NOT NULL,
    num_rows integer NOT NULL,
    seats_per_row integer NOT NULL
);
    DROP TABLE public.stadiums;
       public         heap    postgres    false    2            �            1259    16426    teams    TABLE     �   CREATE TABLE public.teams (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    team_name text NOT NULL,
    nen text NOT NULL,
    hue_rotate text NOT NULL,
    hunterpedia text NOT NULL,
    image_url text NOT NULL
);
    DROP TABLE public.teams;
       public         heap    postgres    false    2            �            1259    16400    users    TABLE     �  CREATE TABLE public.users (
    fname text NOT NULL,
    lname text NOT NULL,
    username text NOT NULL,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email text NOT NULL,
    userrole integer DEFAULT 0 NOT NULL,
    gender integer DEFAULT 0 NOT NULL,
    birthdate date NOT NULL,
    nationality text,
    hash text NOT NULL,
    approved boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            E          0    16415    adminstrators 
   TABLE DATA           E   COPY public.adminstrators (id, username, hash, userrole) FROM stdin;
    public          postgres    false    216   �1       I          0    16456    matches 
   TABLE DATA           j   COPY public.matches (team1, team2, id, start_time, main_ref, line_man_1, line_man_2, stad_id) FROM stdin;
    public          postgres    false    220   2       G          0    16436    referee 
   TABLE DATA           9   COPY public.referee (id, ref_role, ref_name) FROM stdin;
    public          postgres    false    218   62       J          0    16492    reservations 
   TABLE DATA           C   COPY public.reservations (chair_id, match_id, user_id) FROM stdin;
    public          postgres    false    221   �2       H          0    16446    stadiums 
   TABLE DATA           J   COPY public.stadiums (id, stad_name, num_rows, seats_per_row) FROM stdin;
    public          postgres    false    219   �2       F          0    16426    teams 
   TABLE DATA           W   COPY public.teams (id, team_name, nen, hue_rotate, hunterpedia, image_url) FROM stdin;
    public          postgres    false    217   +3       D          0    16400    users 
   TABLE DATA           |   COPY public.users (fname, lname, username, id, email, userrole, gender, birthdate, nationality, hash, approved) FROM stdin;
    public          postgres    false    215   �5       �           2606    16423     adminstrators adminstrators_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.adminstrators
    ADD CONSTRAINT adminstrators_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.adminstrators DROP CONSTRAINT adminstrators_pkey;
       public            postgres    false    216            �           2606    16425 (   adminstrators adminstrators_username_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.adminstrators
    ADD CONSTRAINT adminstrators_username_key UNIQUE (username);
 R   ALTER TABLE ONLY public.adminstrators DROP CONSTRAINT adminstrators_username_key;
       public            postgres    false    216            �           2606    16461    matches matches_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_pkey;
       public            postgres    false    220            �           2606    16443    referee referee_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.referee
    ADD CONSTRAINT referee_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.referee DROP CONSTRAINT referee_pkey;
       public            postgres    false    218            �           2606    16445    referee referee_ref_name_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.referee
    ADD CONSTRAINT referee_ref_name_key UNIQUE (ref_name);
 F   ALTER TABLE ONLY public.referee DROP CONSTRAINT referee_ref_name_key;
       public            postgres    false    218            �           2606    16496    reservations reservations_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (chair_id, match_id);
 H   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_pkey;
       public            postgres    false    221    221            �           2606    16453    stadiums stadiums_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.stadiums
    ADD CONSTRAINT stadiums_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.stadiums DROP CONSTRAINT stadiums_pkey;
       public            postgres    false    219            �           2606    16455    stadiums stadiums_stad_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.stadiums
    ADD CONSTRAINT stadiums_stad_name_key UNIQUE (stad_name);
 I   ALTER TABLE ONLY public.stadiums DROP CONSTRAINT stadiums_stad_name_key;
       public            postgres    false    219            �           2606    16433    teams teams_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.teams DROP CONSTRAINT teams_pkey;
       public            postgres    false    217            �           2606    16435    teams teams_team_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_team_name_key UNIQUE (team_name);
 C   ALTER TABLE ONLY public.teams DROP CONSTRAINT teams_team_name_key;
       public            postgres    false    217            �           2606    16414    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    16410    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    16412    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    215            �           2606    16482    matches matches_line_man_1_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_line_man_1_fkey FOREIGN KEY (line_man_1) REFERENCES public.referee(id);
 I   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_line_man_1_fkey;
       public          postgres    false    218    220    3235            �           2606    16487    matches matches_line_man_2_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_line_man_2_fkey FOREIGN KEY (line_man_2) REFERENCES public.referee(id);
 I   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_line_man_2_fkey;
       public          postgres    false    218    220    3235            �           2606    16477    matches matches_main_ref_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_main_ref_fkey FOREIGN KEY (main_ref) REFERENCES public.referee(id);
 G   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_main_ref_fkey;
       public          postgres    false    218    3235    220            �           2606    16462    matches matches_stad_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_stad_id_fkey FOREIGN KEY (stad_id) REFERENCES public.stadiums(id);
 F   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_stad_id_fkey;
       public          postgres    false    220    219    3239            �           2606    16467    matches matches_team1_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_team1_fkey FOREIGN KEY (team1) REFERENCES public.teams(id);
 D   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_team1_fkey;
       public          postgres    false    217    3231    220            �           2606    16472    matches matches_team2_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_team2_fkey FOREIGN KEY (team2) REFERENCES public.teams(id);
 D   ALTER TABLE ONLY public.matches DROP CONSTRAINT matches_team2_fkey;
       public          postgres    false    3231    217    220            �           2606    16497 '   reservations reservations_match_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_match_id_fkey FOREIGN KEY (match_id) REFERENCES public.matches(id);
 Q   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_match_id_fkey;
       public          postgres    false    3243    220    221            �           2606    16502 &   reservations reservations_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.reservations DROP CONSTRAINT reservations_user_id_fkey;
       public          postgres    false    215    221    3223            E      x������ � �      I      x������ � �      G   x   x��1�0@�9���S;�s
�";��p��|�Ko�Qݐ�\��8� *2Z��J��yZVq%�>�½#GvA�폯_{YnA��	���x?����5F�t;ߏ���K��_�$�      J      x������ � �      H   @   x��0O63J42�56H1�51�4�ML�0�54I1LLJ2K5IK�t,J�KT02��41����� ��Q      F   |  x����j1��������ې�%M)�W�`F�(���5{ ��W��4���hF��c���� X3
�d�r9Z��m�}S��Z��u��C�%ܱ�Od�����v�����g��N�q����z��Ea����ڸ��þ�������T?��e�uTTC*0�D�Tz�t�s��Cu8���ҟ�L��Pwǡ4%�/ �ev�2�P󅉋��iNzU�$u��Ն+� �<-��gX���MS��B�dL��Y����z"f*d0T��h�Rn��
���؞��ȷ�
U�� �B��8!�qٗ8�
�4p�i�Q��T�Y�O]����f�E���Ibw�x�j,LD�$)��4)�J�<�N�LA��#8Y����#������4-�9�����-[V�2U�k�m�F$ˉ܏�{ra�Y�jE��V���*KFyr�i^ RA*��r^����e�Ģ��{k��ԿX�}`�� �*�z31���)�XuMY�Ǧm^.W}	Ȭ��5����f�I�(&&�Hr�IH��)�чLn�ms84��C�%��>I���,��'t�v�2���"pju,��j\��D	�����þ�z��i����"���ޝU����D�s�Z��e"      D   �   x�%��
�@F��s���ӌ�p��%Q��;ZY&Z��g�:|��MYr2Wӎ�Kp ���(��*8��3jP�J"�"W��;��jakSݼ�QF��(h
��vh:���e��uR�Vn������΋/i����,zjQ�|\d_%%{cŜ�s����Z2�     