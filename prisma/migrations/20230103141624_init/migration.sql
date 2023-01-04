-- CreateTable
CREATE TABLE `failed_jobs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `connection` TEXT NOT NULL,
    `queue` TEXT NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `exception` LONGTEXT NOT NULL,
    `failed_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_resets` (
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    INDEX `password_resets_email_index`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal_access_tokens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tokenable_type` VARCHAR(255) NOT NULL,
    `tokenable_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `token` VARCHAR(64) NOT NULL,
    `abilities` TEXT NULL,
    `last_used_at` TIMESTAMP(0) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `personal_access_tokens_token_unique`(`token`),
    INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbavaliacao` (
    `idAvaliacao` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `dtAvaliacao` DATE NOT NULL,
    `notaAvaliacao` INTEGER NOT NULL,
    `descAvaliacao` VARCHAR(255) NOT NULL,
    `idRestaurante` INTEGER NOT NULL,
    `idCliente` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`idAvaliacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbcliente` (
    `idCliente` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomeCliente` VARCHAR(300) NOT NULL,
    `cpfCliente` CHAR(11) NOT NULL,
    `senhaCliente` VARCHAR(255) NOT NULL,
    `fotoCliente` VARCHAR(255) NOT NULL,
    `emailCliente` VARCHAR(100) NOT NULL,
    `cepCliente` CHAR(8) NOT NULL,
    `telefoneCliente` VARCHAR(11) NOT NULL,
    `ruaCliente` VARCHAR(100) NOT NULL,
    `numCasa` VARCHAR(5) NOT NULL,
    `bairroCliente` VARCHAR(100) NOT NULL,
    `cidadeCliente` VARCHAR(100) NOT NULL,
    `estadoCliente` VARCHAR(40) NOT NULL,
    `token` VARCHAR(255) NOT NULL DEFAULT '---',
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `tbcliente_cpfcliente_unique`(`cpfCliente`),
    UNIQUE INDEX `tbcliente_emailcliente_unique`(`emailCliente`),
    UNIQUE INDEX `tbcliente_cepcliente_unique`(`cepCliente`),
    UNIQUE INDEX `tbcliente_telefonecliente_unique`(`telefoneCliente`),
    PRIMARY KEY (`idCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbmesa` (
    `idMesa` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `quantAcentosMesa` INTEGER NOT NULL,
    `statusMesa` INTEGER NOT NULL,
    `numMesa` INTEGER NOT NULL,
    `idRestaurante` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `tbmesa_idrestaurante_foreign`(`idRestaurante`),
    PRIMARY KEY (`idMesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbmesareserva` (
    `idMesaReserva` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `idMesa` INTEGER UNSIGNED NOT NULL,
    `idReserva` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `tbmesareserva_idmesa_foreign`(`idMesa`),
    INDEX `tbmesareserva_idreserva_foreign`(`idReserva`),
    PRIMARY KEY (`idMesaReserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbprato` (
    `idPrato` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomePrato` VARCHAR(60) NOT NULL,
    `valorPrato` DECIMAL(6, 2) NOT NULL,
    `ingredientesPrato` VARCHAR(100) NOT NULL,
    `fotoPrato` VARCHAR(255) NOT NULL,
    `idTipoPrato` INTEGER UNSIGNED NOT NULL,
    `idRestaurante` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `tbprato_idrestaurante_foreign`(`idRestaurante`),
    INDEX `tbprato_idtipoprato_foreign`(`idTipoPrato`),
    PRIMARY KEY (`idPrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbreserva` (
    `idReserva` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `dataReserva` DATE NOT NULL,
    `horaReserva` TIME(0) NOT NULL,
    `numPessoas` INTEGER NOT NULL,
    `idCliente` INTEGER UNSIGNED NOT NULL,
    `idRestaurante` INTEGER UNSIGNED NOT NULL,
    `idStatusReserva` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `tbreserva_idcliente_foreign`(`idCliente`),
    INDEX `tbreserva_idrestaurante_foreign`(`idRestaurante`),
    INDEX `tbreserva_idstatusreserva_foreign`(`idStatusReserva`),
    PRIMARY KEY (`idReserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbrestaurante` (
    `idRestaurante` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nomeRestaurante` VARCHAR(300) NOT NULL,
    `cnpjRestaurante` CHAR(14) NOT NULL,
    `telRestaurante` CHAR(13) NOT NULL,
    `senhaRestaurante` VARCHAR(255) NOT NULL,
    `fotoRestaurante` VARCHAR(255) NOT NULL,
    `emailRestaurante` VARCHAR(100) NOT NULL,
    `cepRestaurante` CHAR(9) NOT NULL,
    `ruaRestaurante` VARCHAR(100) NOT NULL,
    `numRestaurante` VARCHAR(5) NOT NULL,
    `bairroRestaurante` VARCHAR(100) NOT NULL,
    `cidadeRestaurante` VARCHAR(100) NOT NULL,
    `estadoRestaurante` VARCHAR(40) NOT NULL,
    `horarioAberturaRestaurante` TIME(0) NOT NULL,
    `horarioFechamentoRestaurante` TIME(0) NOT NULL,
    `capacidadeRestaurante` INTEGER NOT NULL,
    `lotacaoRestaurante` BOOLEAN NOT NULL,
    `descricaoRestaurante` VARCHAR(1000) NOT NULL,
    `idTipoRestaurante` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `tbrestaurante_idtiporestaurante_foreign`(`idTipoRestaurante`),
    PRIMARY KEY (`idRestaurante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbstatusreserva` (
    `idStatusReserva` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `statusReserva` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`idStatusReserva`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbtipoprato` (
    `idTipoPrato` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tipoPrato` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`idTipoPrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbtiporestaurante` (
    `idTipoRestaurante` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `tipoRestaurante` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`idTipoRestaurante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP(0) NULL,
    `password` VARCHAR(255) NOT NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbmesa` ADD CONSTRAINT `tbmesa_idrestaurante_foreign` FOREIGN KEY (`idRestaurante`) REFERENCES `tbrestaurante`(`idRestaurante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbmesareserva` ADD CONSTRAINT `tbmesareserva_idmesa_foreign` FOREIGN KEY (`idMesa`) REFERENCES `tbmesa`(`idMesa`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbmesareserva` ADD CONSTRAINT `tbmesareserva_idreserva_foreign` FOREIGN KEY (`idReserva`) REFERENCES `tbreserva`(`idReserva`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbprato` ADD CONSTRAINT `tbprato_idrestaurante_foreign` FOREIGN KEY (`idRestaurante`) REFERENCES `tbrestaurante`(`idRestaurante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbprato` ADD CONSTRAINT `tbprato_idtipoprato_foreign` FOREIGN KEY (`idTipoPrato`) REFERENCES `tbtipoprato`(`idTipoPrato`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbreserva` ADD CONSTRAINT `tbreserva_idcliente_foreign` FOREIGN KEY (`idCliente`) REFERENCES `tbcliente`(`idCliente`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbreserva` ADD CONSTRAINT `tbreserva_idrestaurante_foreign` FOREIGN KEY (`idRestaurante`) REFERENCES `tbrestaurante`(`idRestaurante`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbreserva` ADD CONSTRAINT `tbreserva_idstatusreserva_foreign` FOREIGN KEY (`idStatusReserva`) REFERENCES `tbstatusreserva`(`idStatusReserva`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tbrestaurante` ADD CONSTRAINT `tbrestaurante_idtiporestaurante_foreign` FOREIGN KEY (`idTipoRestaurante`) REFERENCES `tbtiporestaurante`(`idTipoRestaurante`) ON DELETE RESTRICT ON UPDATE RESTRICT;
