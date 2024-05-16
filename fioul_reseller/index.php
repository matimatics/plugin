<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo plugins_url('/css/style.css', __FILE__); ?>">
</head>

<body>
    <div class="content-plugin">
        <div class="plugin-title-container">
            <h4 class="plugin-on-title">Votre commande en ligne</h4>
            <h1 class="plugin-main-title">commandez en un clin d'oeil</h1>
        </div>
        <div class="plugin-form-container">
            <form method="post" class="plugin-form-inputs">
                <div class="plugin-area-first">
                    <div class="plugin-input-text">
                        <label for="codePostal"> Ma localité</label>
                        <input type="text" placeholder="Code Postal" class="plugin-pc-input" name="codePostal" id="userInput" required>
                    </div>
                </div>
                <div class="plugin-type-section">
                    <h5> Votre commande concerne :</h5>
                    <ul class="plugin-button-list">
                        <li class="">
                            <button class="plugin-type-button" onclick="renderAFK('Fioul')" id="fioul">
                                <img src="<?php echo plugins_url('/img/afk1_1.png', __FILE__); ?>" class="plugin-button-img" alt="" width="50">
                                <p class="plugin-button-text">Fioul</p>
                            </button>
                        </li>
                        <li class="">
                            <button class="plugin-type-button" onclick="renderAFK('Fioul Expert')" id="expert">
                                <img src="<?php echo plugins_url('/img/afk1_3.png', __FILE__); ?>" class="plugin-button-img" alt="" width="50">
                                <p class="plugin-button-text">Fioul Expert</p>
                            </button>
                        </li>
                        <li class="">
                            <button class="plugin-type-button" onclick="pelletComponent()">
                                <img src="<?php echo plugins_url('/img/afk1_4.png', __FILE__); ?>" class="plugin-button-img" alt="" width="50">
                                <p class="plugin-button-text">Pellet</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
        <div class="plugin-modules"></div>
    </div>
    <script src="<?php echo plugins_url('script.js', __FILE__); ?>"></script>
</body>
