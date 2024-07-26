DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint AS con
        INNER JOIN pg_class AS rel ON rel.oid = con.conrelid
        INNER JOIN pg_namespace AS ns ON ns.oid = rel.relnamespace
        WHERE con.conname = 'check_situacao'
        AND rel.relname = 'tbpessoa'
        AND ns.nspname = 'unidavi'
    ) THEN
        ALTER TABLE unidavi.tbpessoa ADD CONSTRAINT "check_situacao" CHECK ("situacao" IN (0, 1));
    ELSE
        RAISE NOTICE 'A constraint já existe.';
    END IF;
END $$;