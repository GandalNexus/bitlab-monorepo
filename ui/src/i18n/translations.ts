export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // HomePage
    home: {
      title: "Bitcoin Lab",
      subtitle: "Developer Testing Suite",
      launchLab: "Launch Lab",
      heroTitle: "Bitcoin Development Made Simple",
      heroSubtitle: "A powerful web interface for testing Bitcoin transactions, managing wallets, and experimenting with Lightning Network — without the complexity of CLI tools.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      whyBitcoinLab: "Why Bitcoin Lab?",
      features: {
        visual: {
          title: "Visual Transaction Building",
          description: "Build and test Bitcoin transactions with an intuitive interface. No more cryptic command-line tools."
        },
        wallet: {
          title: "Wallet Management",
          description: "Create and manage multiple test wallets. Import existing keys or generate new ones with ease."
        },
        testing: {
          title: "Safe Testing Environment",
          description: "Experiment with testnet Bitcoin safely. Perfect for learning and development without real funds at risk."
        },
        lightning: {
          title: "Lightning Network Ready",
          description: "Test Lightning Network operations and learn about second-layer solutions in a controlled environment."
        },
        network: {
          title: "Multi-Network Support",
          description: "Switch between testnet, mainnet, and regtest networks. Full flexibility for your development needs."
        },
        secure: {
          title: "Secure & Private",
          description: "All operations happen in your browser. Your keys and data never leave your device."
        }
      },
      cta: {
        title: "Ready to Start Building?",
        description: "Join developers worldwide who are using Bitcoin Lab to accelerate their Bitcoin development workflow.",
        button: "Open Bitcoin Lab"
      },
      footer: {
        copyright: "© 2025",
        documentation: "Documentation",
        github: "GitHub",
        community: "Community"
      }
    },
    // LabInterface
    lab: {
      navigation: "Navigation Menu",
      accessTools: "Access Bitcoin Lab tools and features",
      menuButton: "Menu",
      home: "Home",
      buildTransaction: "Build Transaction",
      signTransaction: "Sign Transaction",
      viewTransaction: "View Transaction",
      walletManager: "Wallet Manager",
      faucet: "Faucet",
      lightning: "Lightning",
      settings: "Settings"
    },
    // NetworkSelector
    network: {
      title: "Bitcoin Network",
      testnet: "Testnet",
      mainnet: "Mainnet",
      regtest: "Regtest",
      comingSoon: "Coming Soon",
      comingSoonMessage: "This network will be available in a future update.",
      close: "Close"
    },
    // WalletManager
    wallet: {
      title: "Wallet Manager",
      description: "Create and manage your Bitcoin wallets",
      createNew: "Create New Wallet",
      noWallets: "No wallets yet",
      getStarted: "Create your first wallet to get started",
      importWallet: "Import Wallet",
      walletName: "Wallet Name",
      walletNamePlaceholder: "My Bitcoin Wallet",
      privateKey: "Private Key (WIF)",
      privateKeyPlaceholder: "Enter private key in WIF format",
      cancel: "Cancel",
      create: "Create Wallet",
      import: "Import Wallet",
      copyAddress: "Copy address",
      copyPrivateKey: "Copy private key",
      deleteWallet: "Delete wallet",
      addressCopied: "Address copied to clipboard",
      privateKeyCopied: "Private key copied to clipboard",
      deleteConfirmTitle: "Delete Wallet",
      deleteConfirmMessage: "Are you sure you want to delete this wallet? This action cannot be undone.",
      delete: "Delete",
      walletDeleted: "Wallet deleted successfully"
    },
    // TransactionBuilder
    transaction: {
      title: "Build Transaction",
      description: "Create and customize Bitcoin transactions",
      inputs: "Transaction Inputs",
      outputs: "Transaction Outputs",
      addInput: "Add Input",
      addOutput: "Add Output",
      txid: "Transaction ID (TXID)",
      txidPlaceholder: "Enter transaction ID",
      vout: "Output Index (vout)",
      voutPlaceholder: "0",
      address: "Bitcoin Address",
      addressPlaceholder: "Enter Bitcoin address",
      amount: "Amount (BTC)",
      amountPlaceholder: "0.001",
      remove: "Remove",
      buildTransaction: "Build Transaction",
      rawTransaction: "Raw Transaction (Hex)",
      copy: "Copy",
      copied: "Copied!",
      summary: "Transaction Summary",
      totalInput: "Total Input",
      totalOutput: "Total Output",
      estimatedFee: "Estimated Fee",
      btc: "BTC"
    },
    // SignTransaction
    sign: {
      title: "Sign Transaction",
      description: "Sign your Bitcoin transactions with your private key",
      rawTx: "Raw Transaction (Hex)",
      rawTxPlaceholder: "Enter unsigned transaction hex",
      privateKey: "Private Key (WIF)",
      privateKeyPlaceholder: "Enter private key in WIF format",
      signTransaction: "Sign Transaction",
      signedTransaction: "Signed Transaction",
      copy: "Copy",
      copied: "Copied!",
      broadcast: "Broadcast Transaction"
    },
    // ViewTransaction
    view: {
      title: "View Transaction",
      description: "Decode and inspect Bitcoin transactions",
      rawTx: "Raw Transaction (Hex)",
      rawTxPlaceholder: "Enter transaction hex to decode",
      decode: "Decode Transaction",
      details: "Transaction Details",
      version: "Version",
      locktime: "Locktime",
      inputs: "Inputs",
      input: "Input",
      previousTx: "Previous TX",
      outputIndex: "Output Index",
      scriptSig: "ScriptSig",
      sequence: "Sequence",
      outputs: "Outputs",
      output: "Output",
      value: "Value",
      btc: "BTC",
      scriptPubKey: "ScriptPubKey",
      copy: "Copy"
    },
    // Faucet
    faucet: {
      title: "Testnet Faucet",
      description: "Get free testnet Bitcoin for development",
      info: "Request free testnet Bitcoin to fund your development wallets. Testnet coins have no real value and are only for testing purposes.",
      yourAddress: "Your Testnet Address",
      addressPlaceholder: "Enter your testnet Bitcoin address",
      requestFunds: "Request Testnet BTC",
      requestSuccess: "Success!",
      requestSuccessMessage: "Testnet Bitcoin has been sent to your address. It should arrive within a few minutes.",
      viewTransaction: "View Transaction",
      popularFaucets: "Popular Testnet Faucets",
      visitFaucet: "Visit Faucet"
    },
    // Lightning
    lightning: {
      title: "Lightning Network",
      description: "Test Lightning Network operations",
      info: "The Lightning Network is a second-layer payment protocol that operates on top of Bitcoin. It enables fast, low-cost transactions.",
      comingSoon: "Lightning Network features are coming soon!",
      features: "Planned Features",
      feature1: "Create and manage Lightning channels",
      feature2: "Send and receive Lightning payments",
      feature3: "Test invoice generation and payment",
      feature4: "Monitor channel liquidity and routing",
      learnMore: "Learn More About Lightning"
    }
  },
  fr: {
    // HomePage
    home: {
      title: "Bitcoin Lab",
      subtitle: "Suite de Test pour Développeurs",
      launchLab: "Lancer le Labo",
      heroTitle: "Le Développement Bitcoin Simplifié",
      heroSubtitle: "Une interface web puissante pour tester les transactions Bitcoin, gérer les portefeuilles et expérimenter avec Lightning Network — sans la complexité des outils en ligne de commande.",
      getStarted: "Commencer",
      learnMore: "En Savoir Plus",
      whyBitcoinLab: "Pourquoi Bitcoin Lab ?",
      features: {
        visual: {
          title: "Construction Visuelle de Transactions",
          description: "Créez et testez des transactions Bitcoin avec une interface intuitive. Fini les outils cryptiques en ligne de commande."
        },
        wallet: {
          title: "Gestion de Portefeuilles",
          description: "Créez et gérez plusieurs portefeuilles de test. Importez des clés existantes ou générez-en de nouvelles facilement."
        },
        testing: {
          title: "Environnement de Test Sécurisé",
          description: "Expérimentez avec le testnet Bitcoin en toute sécurité. Parfait pour l'apprentissage et le développement sans risque de fonds réels."
        },
        lightning: {
          title: "Compatible Lightning Network",
          description: "Testez les opérations Lightning Network et apprenez les solutions de deuxième couche dans un environnement contrôlé."
        },
        network: {
          title: "Support Multi-Réseau",
          description: "Basculez entre testnet, mainnet et regtest. Flexibilité totale pour vos besoins de développement."
        },
        secure: {
          title: "Sécurisé et Privé",
          description: "Toutes les opérations se déroulent dans votre navigateur. Vos clés et données ne quittent jamais votre appareil."
        }
      },
      cta: {
        title: "Prêt à Commencer ?",
        description: "Rejoignez les développeurs du monde entier qui utilisent Bitcoin Lab pour accélérer leur flux de travail de développement Bitcoin.",
        button: "Ouvrir Bitcoin Lab"
      },
      footer: {
        copyright: "© 2025",
        documentation: "Documentation",
        github: "GitHub",
        community: "Communauté"
      }
    },
    // LabInterface
    lab: {
      navigation: "Menu de Navigation",
      accessTools: "Accéder aux outils et fonctionnalités de Bitcoin Lab",
      menuButton: "Menu",
      home: "Accueil",
      buildTransaction: "Créer Transaction",
      signTransaction: "Signer Transaction",
      viewTransaction: "Voir Transaction",
      walletManager: "Gestionnaire de Portefeuilles",
      faucet: "Robinet",
      lightning: "Lightning",
      settings: "Paramètres"
    },
    // NetworkSelector
    network: {
      title: "Réseau Bitcoin",
      testnet: "Testnet",
      mainnet: "Mainnet",
      regtest: "Regtest",
      comingSoon: "Prochainement",
      comingSoonMessage: "Ce réseau sera disponible dans une mise à jour future.",
      close: "Fermer"
    },
    // WalletManager
    wallet: {
      title: "Gestionnaire de Portefeuilles",
      description: "Créez et gérez vos portefeuilles Bitcoin",
      createNew: "Créer un Nouveau Portefeuille",
      noWallets: "Aucun portefeuille",
      getStarted: "Créez votre premier portefeuille pour commencer",
      importWallet: "Importer un Portefeuille",
      walletName: "Nom du Portefeuille",
      walletNamePlaceholder: "Mon Portefeuille Bitcoin",
      privateKey: "Clé Privée (WIF)",
      privateKeyPlaceholder: "Entrez la clé privée au format WIF",
      cancel: "Annuler",
      create: "Créer le Portefeuille",
      import: "Importer le Portefeuille",
      copyAddress: "Copier l'adresse",
      copyPrivateKey: "Copier la clé privée",
      deleteWallet: "Supprimer le portefeuille",
      addressCopied: "Adresse copiée dans le presse-papiers",
      privateKeyCopied: "Clé privée copiée dans le presse-papiers",
      deleteConfirmTitle: "Supprimer le Portefeuille",
      deleteConfirmMessage: "Êtes-vous sûr de vouloir supprimer ce portefeuille ? Cette action ne peut pas être annulée.",
      delete: "Supprimer",
      walletDeleted: "Portefeuille supprimé avec succès"
    },
    // TransactionBuilder
    transaction: {
      title: "Créer une Transaction",
      description: "Créez et personnalisez des transactions Bitcoin",
      inputs: "Entrées de Transaction",
      outputs: "Sorties de Transaction",
      addInput: "Ajouter une Entrée",
      addOutput: "Ajouter une Sortie",
      txid: "ID de Transaction (TXID)",
      txidPlaceholder: "Entrez l'ID de transaction",
      vout: "Index de Sortie (vout)",
      voutPlaceholder: "0",
      address: "Adresse Bitcoin",
      addressPlaceholder: "Entrez l'adresse Bitcoin",
      amount: "Montant (BTC)",
      amountPlaceholder: "0.001",
      remove: "Supprimer",
      buildTransaction: "Créer la Transaction",
      rawTransaction: "Transaction Brute (Hex)",
      copy: "Copier",
      copied: "Copié !",
      summary: "Résumé de la Transaction",
      totalInput: "Total des Entrées",
      totalOutput: "Total des Sorties",
      estimatedFee: "Frais Estimés",
      btc: "BTC"
    },
    // SignTransaction
    sign: {
      title: "Signer une Transaction",
      description: "Signez vos transactions Bitcoin avec votre clé privée",
      rawTx: "Transaction Brute (Hex)",
      rawTxPlaceholder: "Entrez l'hex de la transaction non signée",
      privateKey: "Clé Privée (WIF)",
      privateKeyPlaceholder: "Entrez la clé privée au format WIF",
      signTransaction: "Signer la Transaction",
      signedTransaction: "Transaction Signée",
      copy: "Copier",
      copied: "Copié !",
      broadcast: "Diffuser la Transaction"
    },
    // ViewTransaction
    view: {
      title: "Voir la Transaction",
      description: "Décodez et inspectez les transactions Bitcoin",
      rawTx: "Transaction Brute (Hex)",
      rawTxPlaceholder: "Entrez l'hex de la transaction à décoder",
      decode: "Décoder la Transaction",
      details: "Détails de la Transaction",
      version: "Version",
      locktime: "Locktime",
      inputs: "Entrées",
      input: "Entrée",
      previousTx: "TX Précédente",
      outputIndex: "Index de Sortie",
      scriptSig: "ScriptSig",
      sequence: "Séquence",
      outputs: "Sorties",
      output: "Sortie",
      value: "Valeur",
      btc: "BTC",
      scriptPubKey: "ScriptPubKey",
      copy: "Copier"
    },
    // Faucet
    faucet: {
      title: "Robinet Testnet",
      description: "Obtenez des Bitcoin testnet gratuits pour le développement",
      info: "Demandez des Bitcoin testnet gratuits pour financer vos portefeuilles de développement. Les pièces testnet n'ont aucune valeur réelle et sont uniquement destinées aux tests.",
      yourAddress: "Votre Adresse Testnet",
      addressPlaceholder: "Entrez votre adresse Bitcoin testnet",
      requestFunds: "Demander des BTC Testnet",
      requestSuccess: "Succès !",
      requestSuccessMessage: "Les Bitcoin testnet ont été envoyés à votre adresse. Ils devraient arriver dans quelques minutes.",
      viewTransaction: "Voir la Transaction",
      popularFaucets: "Robinets Testnet Populaires",
      visitFaucet: "Visiter le Robinet"
    },
    // Lightning
    lightning: {
      title: "Lightning Network",
      description: "Testez les opérations Lightning Network",
      info: "Le Lightning Network est un protocole de paiement de deuxième couche qui fonctionne au-dessus de Bitcoin. Il permet des transactions rapides et peu coûteuses.",
      comingSoon: "Les fonctionnalités Lightning Network arrivent bientôt !",
      features: "Fonctionnalités Prévues",
      feature1: "Créer et gérer des canaux Lightning",
      feature2: "Envoyer et recevoir des paiements Lightning",
      feature3: "Tester la génération et le paiement de factures",
      feature4: "Surveiller la liquidité des canaux et le routage",
      learnMore: "En Savoir Plus sur Lightning"
    }
  }
};

export type TranslationKey = typeof translations.en;
