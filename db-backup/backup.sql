PGDMP  $    -                }            mydb    17.2    17.2     8           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            9           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            :           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            ;           1262    16616    mydb    DATABASE        CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE mydb;
                     postgres    false            �            1259    16645    AgronomicActivity    TABLE       CREATE TABLE public."AgronomicActivity" (
    id text NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type text NOT NULL,
    inputs text NOT NULL,
    duration integer NOT NULL,
    "userId" text NOT NULL,
    "plotId" text NOT NULL
);
 '   DROP TABLE public."AgronomicActivity";
       public         heap r       postgres    false            �            1259    16638    Plot    TABLE     �   CREATE TABLE public."Plot" (
    id text NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL,
    size double precision NOT NULL,
    "cropType" text NOT NULL,
    "userId" text NOT NULL
);
    DROP TABLE public."Plot";
       public         heap r       postgres    false            �            1259    16630    User    TABLE     �   CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "hashedPassword" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap r       postgres    false            �            1259    16619    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r       postgres    false            5          0    16645    AgronomicActivity 
   TABLE DATA           c   COPY public."AgronomicActivity" (id, date, type, inputs, duration, "userId", "plotId") FROM stdin;
    public               postgres    false    220          4          0    16638    Plot 
   TABLE DATA           U   COPY public."Plot" (id, latitude, longitude, size, "cropType", "userId") FROM stdin;
    public               postgres    false    219   w       3          0    16630    User 
   TABLE DATA           W   COPY public."User" (id, email, "hashedPassword", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    218   �       2          0    16619    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public               postgres    false    217   �       �           2606    16652 (   AgronomicActivity AgronomicActivity_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public."AgronomicActivity"
    ADD CONSTRAINT "AgronomicActivity_pkey" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public."AgronomicActivity" DROP CONSTRAINT "AgronomicActivity_pkey";
       public                 postgres    false    220            �           2606    16644    Plot Plot_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Plot"
    ADD CONSTRAINT "Plot_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Plot" DROP CONSTRAINT "Plot_pkey";
       public                 postgres    false    219            �           2606    16637    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 postgres    false    218            �           2606    16627 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public                 postgres    false    217            �           1259    16653    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public                 postgres    false    218            �           2606    16664 /   AgronomicActivity AgronomicActivity_plotId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AgronomicActivity"
    ADD CONSTRAINT "AgronomicActivity_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES public."Plot"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public."AgronomicActivity" DROP CONSTRAINT "AgronomicActivity_plotId_fkey";
       public               postgres    false    219    220    4763            �           2606    16659 /   AgronomicActivity AgronomicActivity_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."AgronomicActivity"
    ADD CONSTRAINT "AgronomicActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public."AgronomicActivity" DROP CONSTRAINT "AgronomicActivity_userId_fkey";
       public               postgres    false    4761    218    220            �           2606    16654    Plot Plot_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Plot"
    ADD CONSTRAINT "Plot_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."Plot" DROP CONSTRAINT "Plot_userId_fkey";
       public               postgres    false    4761    219    218            5   _  x�͒=n1F�S� �A���� nܺ�D*`w֘]��S�b�"i�I��HC�����FA�24kq� U<��r
y
"` ��@x@�;�M�G;-ǣ\��;ɏ�o�ܽm�帼�z5�����NZ3��U�A�a@-�CȾTʚi�$�l�h-b�7�X �>�D��y�R�KgPi"F�ҡFIJ#R���!���� ����{�4��(��$ӿ"_>�����}d����o)P0B��f��o�r�qp�(��e����b��l���z=�����s4'�h2��
�\�1������}Oj	#� Z7?���j����yu�V��O߬�Tq����v�|����<�說
r      4   �   x����N1��x�8�J�
��8G�:t�ឞ��j�\��>.=��`JG��6=`�ִ�iŰ����5>e�4�U�gM`���IUo2���E�e�ӕ���E�B_�
e�.V��V��\:����vQ��%�P׬���R4ĥ&m��]x?�������s4��� ��d��y� c~�����yq�I2:���t��zw>��"��*�'�X�<ā��B!�0,Y�[f�Obj|���o��?8��      3   �   x�uιR�@ ��vqϟ]*39Ԙ8&��r,0B@@H���9�����T�)�R�!� �	�(O1H�f%EW�C�7y���M��rh���5̴E��L;U۰_��v��yN�!f�z�>�Y�����K�E1S���|�|�\&.�-M�	�H~�"�Hr�Ha��56�˧2?���W}�4!̲Ӣ>�r�Ӓ�/����q�^_�6?f�~���A������9�r1��~wm���_]1      2   �   x�m�1�0����K2-����bY:��h����G�O�1�#4W���4���6P��hL�k4r�r6N�lM����(bv	�y� �^*�pc;.�\8��w�掚ˏ.t>B�y��ϲ=.�ݩ�+�Bi[SJ_r,D     