(function ($) {
    var I18N_BY_HREF = {
        "Horizont.html": "nav.horizont",
        "Auferstehen.html": "nav.auferstehen",
        "Malen_gegen_die_Dunkelheit.html": "nav.malen_gegen_die_dunkelheit",
        "Noli_me_tangere.html": "nav.noli_me_tangere",
        "Das_Schweigen_brechen.html": "nav.das_schweigen_brechen",
        "Mariupol.html": "nav.mariupol",
        "Begegnungsspuren.html": "nav.begegnungsspuren",
        "Corona.html": "nav.corona",
        "Fiesta_de_la_vida.html": "nav.fiesta_de_la_vida",
        "Sonnengesang.html": "nav.sonnengesang",
        "Primavera.html": "nav.primavera",
        "Hochzeit_des_Lichts.html": "nav.hochzeit_des_lichts",
        "Elementare_Akkorde.html": "nav.elementare_akkorde",
        "Sternengeburt.html": "nav.sternengeburt",
        "Archaeologie.html": "nav.archaeologie",
        "Azulen.html": "nav.azulen",
        "Zeichnungen.html": "nav.zeichnungen",
        "Biografie.html": "nav.biografie",
        "Ausstellungen.html": "nav.ausstellungen",
        "Arbeitssituationen.html": "nav.arbeitssituationen",
        "Literatur.html": "nav.buecher_kataloge",
        "Flyer.html": "nav.flyer",
        "Kunst_am_Bau.html": "nav.kunst_am_bau",
        "Presse.html": "nav.presse",
        "Filme.html": "nav.filme",
        "Kontakt.html": "nav.kontakt",
        "Aktuell.html": "nav.aktuell",
        "Statement.html": "nav.statement"
    };

    var DROPDOWN_LABELS = ["nav.painting", "nav.vita", "nav.publikationen"];
    var ORIGINAL_CONTENT_BY_KEY = {};
    var TRANSLATED_ELEMENT_KEYS = [];
    var NEXT_ELEMENT_KEY = 0;
    var ORIGINAL_PAGE_TITLE = document.title;
    var MONTH_TRANSLATIONS_EN = [
        [/\bJanuar\b/g, "January"],
        [/\bFebruar\b/g, "February"],
        [/\bM\u00e4rz\b/g, "March"],
        [/\bApril\b/g, "April"],
        [/\bMai\b/g, "May"],
        [/\bJuni\b/g, "June"],
        [/\bJuli\b/g, "July"],
        [/\bAugust\b/g, "August"],
        [/\bSeptember\b/g, "September"],
        [/\bOktober\b/g, "October"],
        [/\bNovember\b/g, "November"],
        [/\bDezember\b/g, "December"]
    ];
    var AUTO_TRANSLATIONS_EN = [
        [/\b\u00d6l\s*\/\s*Lw\b/g, "Oil on canvas"],
        [/\bTusche auf Papier\b/g, "Ink on paper"],
        [/\bBleistift auf Papier\b/g, "Pencil on paper"],
        [/Ausschnitt aus/g, "Detail from"],
        [/Segment aus/g, "Segment from"],
        [/Ausstellungsaufbau/g, "Exhibition setup"],
        [/Ausstelungsituation:?/g, "Exhibition view:"],
        [/Ausstellungssituation:?/g, "Exhibition view:"],
        [/Ateliersituation:?/g, "Studio view:"],
        [/Arbeit an/g, "Working on"],
        [/Arbeitssituation/g, "Work situation"],
        [/Im Atelier/g, "In the studio"],
        [/Atelier Spanien/g, "Studio in Spain"],
        [/Atelier N\u00fcrnberg/g, "Studio in Nuremberg"],
        [/Pr\u00e4sentation der Gem\u00e4lde am Atelier Spanien/g, "Presentation of the paintings at the studio in Spain"],
        [/Arbeiten von Ursula J\u00fcngst im M\u00fcnster Heilsbronn/g, "Works by Ursula J\u00fcngst in Heilsbronn Minster"],
        [/Installation der /g, "Installation of "],
        [/Zyklus:\s*/g, "Series: "],
        [/Zykls:\s*/g, "Series: "],
        [/Zyklus\s+/g, "Series "],
        [/Triptychon\s+/g, "Triptych "],
        [/links:\s*/g, "left: "],
        [/rechts:\s*/g, "right: "],
        [/,\s*je\s+/g, ", each "],
        [/\bvon links\b/g, "from left"],
        [/Mit Texten von/g, "With texts by"],
        [/mit Texten von/g, "with texts by"],
        [/\bHerausgeber\b/g, "Edited by"],
        [/Erschienen im/g, "Published by"],
        [/Hochformat/g, "Portrait format"],
        [/\bSeiten\b/g, "pages"],
        [/\bAbbildungen\b/g, "illustrations"],
        [/Deutsch \/ Englisch/g, "German / English"],
        [/\bDeutsch\b/g, "German"],
        [/Ganzleinen mit Schutzumschlag/g, "clothbound with dust jacket"],
        [/Fadenheftung/g, "thread-sewn binding"],
        [/Buchpr\u00e4sentation/g, "Book presentation"],
        [/Malerei von Ursula J\u00fcngst/g, "Paintings by Ursula J\u00fcngst"],
        [/PDF zur Ansicht und\s*zum Herunterladen/g, "View and download PDF"],
        [/\.\.\.aus dem Katalog/g, "...from the catalogue"],
        [/\.\.\.aus der Monografie/g, "...from the monograph"],
        [/Blick ins Buch/g, "Look inside the book"],
        [/zum Lesen bitte hier klicken:?/g, "click here to read"],
        [/Mehr Informationen:/g, "More information:"],
        [/Plakat zur Ausstellung/g, "Exhibition poster"],
        [/Flyer zur Ausstellung/g, "Exhibition flyer"],
        [/\u00d6ffnungszeiten:/g, "Opening hours:"],
        [/t\u00e4glich von/g, "daily from"],
        [/T\u00e4glich von/g, "Daily from"],
        [/Dienstag bis Sonntag & Feiertage von/g, "Tuesday to Sunday & public holidays from"],
        [/Ausstellungser\u00f6ffnung am/g, "Exhibition opening on"],
        [/Vernissage am/g, "Opening on"],
        [/Finissage am/g, "Closing event on"],
        [/verl\u00e4ngert bis/g, "extended until"],
        [/Kategorie:/g, "Category:"],
        [/\bSpanien\b/g, "Spain"],
        [/\bN\u00fcrnberg\b/g, "Nuremberg"],
        [/Die neue Monografie ist da!/g, "The new monograph is here!"],
        [/Farbabstimmung der neuen Monografie/g, "Color proofing for the new monograph"],
        [/Neue Gem\u00e4lde/g, "New paintings"],
        [/CODAaward - Gewinner 2021/g, "CODA Award - Winner 2021"],
        [/Datenschutzerkl\u00e4rung/g, "Privacy Policy"],
        [/Impressum & Datenschutz/g, "Legal Notice & Privacy Policy"],
        [/Telefon:/g, "Phone:"],
        [/E-Mail:/g, "Email:"]
    ];

    function hasOwn(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

    function getCurrentPageName() {
        var path = window.location.pathname || "";
        return path.split("/").pop() || "index.html";
    }

    function containsHtml(value) {
        return /<br\s*\/?>|<\/?[a-z][\s\S]*>/i.test(value);
    }

    function setElementContent($element, value) {
        if (containsHtml(value)) {
            $element.html(value);
            return;
        }

        $element.text(value);
    }

    function getElementRestoreKey(element) {
        if (element.id) {
            return "id:" + element.id;
        }

        if (!element.__i18nRestoreKey) {
            NEXT_ELEMENT_KEY += 1;
            element.__i18nRestoreKey = "anon:" + NEXT_ELEMENT_KEY;
        }

        return element.__i18nRestoreKey;
    }

    function rememberOriginalContent($element) {
        var element = $element && $element[0];
        var key;
        var existingEntry;

        if (!element) {
            return;
        }

        key = getElementRestoreKey(element);
        existingEntry = ORIGINAL_CONTENT_BY_KEY[key];
        if (existingEntry) {
            if (existingEntry.element !== element && !document.documentElement.contains(existingEntry.element)) {
                existingEntry.element = element;
                existingEntry.html = $element.html();
            }
            return;
        }

        ORIGINAL_CONTENT_BY_KEY[key] = {
            element: element,
            html: $element.html()
        };
        TRANSLATED_ELEMENT_KEYS.push(key);
    }

    function restoreTranslatedContent() {
        TRANSLATED_ELEMENT_KEYS.forEach(function (key) {
            var entry = ORIGINAL_CONTENT_BY_KEY[key];

            if (entry && entry.element && document.documentElement.contains(entry.element)) {
                $(entry.element).html(entry.html);
            }
        });

        document.title = ORIGINAL_PAGE_TITLE;
    }

    function shouldAutoTranslateElement(element, id, html) {
        var childElements;
        var isSafeLeaf = true;

        if (!id || !html) {
            return false;
        }

        if (/^(navbar|wrapper|website_shared_header_tableGrid2snippet0|website_shared_footer_snippet2|index_snippet4)$/.test(id)) {
            return false;
        }

        if ($(element).closest("#navbar, .navbar, .language-selector, .dropdown-menu, .carousel, .carousel-control, .carousel-indicators").length) {
            return false;
        }

        childElements = element.children || [];
        $.each(childElements, function (_, child) {
            if (child.tagName !== "BR") {
                isSafeLeaf = false;
                return false;
            }
        });

        if (!isSafeLeaf) {
            return false;
        }

        return html.length <= 300;
    }

    function translateGeneratedHtml(html, lang) {
        var translated = html;

        if (lang !== "en") {
            return translated;
        }

        MONTH_TRANSLATIONS_EN.forEach(function (entry) {
            translated = translated.replace(entry[0], entry[1]);
        });

        AUTO_TRANSLATIONS_EN.forEach(function (entry) {
            translated = translated.replace(entry[0], entry[1]);
        });

        translated = translated.replace(/\((\d+)-teilig\)/g, "($1 parts)");
        translated = translated.replace(/\b(\d+)-teilig\b/g, "$1 parts");
        translated = translated.replace(/\(Teil\s+(\d+)\)/g, "(Part $1)");

        return translated;
    }

    function applyDataI18nAttributes() {
        $(".navbar-toggle .sr-only").attr("data-i18n", "nav.toggle_navigation");
        $(".carousel-control.left .sr-only").attr("data-i18n", "carousel.previous");
        $(".carousel-control.right .sr-only").attr("data-i18n", "carousel.next");
        $("#website_shared_header_tableGrid2snippet0").attr("data-i18n", "site.artist_name");
        $("#index_snippet4").attr("data-i18n", "site.artist_name");
        $("#website_shared_footer_snippet2 a").attr("data-i18n", "footer.impressum_datenschutz");

        $("#navbar > ul.navbar-nav").first().children("li").each(function (index) {
            var $item = $(this);
            var $link = $item.children("a").first();
            var href = ($link.attr("href") || "").trim();

            if ($item.hasClass("dropdown")) {
                $link.attr("data-i18n", DROPDOWN_LABELS[index] || "");
            } else if (I18N_BY_HREF[href]) {
                $link.attr("data-i18n", I18N_BY_HREF[href]);
            }

            $item.find(".dropdown-menu a").each(function () {
                var $subLink = $(this);
                var subHref = ($subLink.attr("href") || "").trim();

                if (I18N_BY_HREF[subHref]) {
                    $subLink.attr("data-i18n", I18N_BY_HREF[subHref]);
                }
            });
        });
    }

    function ensureHorizontEntry() {
        var $paintingMenu = $("#navbar > ul.navbar-nav").first().children("li.dropdown").first().children(".dropdown-menu");
        if (!$paintingMenu.length || $paintingMenu.find('a[href="Horizont.html"]').length) {
            return;
        }

        $paintingMenu.prepend('<li><a href="Horizont.html" target="_self" data-i18n="nav.horizont">Horizont</a></li>');
    }

    function ensureLanguageSelector() {
        if ($(".language-selector").length) {
            $(".language-selector a").each(function () {
                var $link = $(this);
                var text = $.trim($link.text()).toUpperCase();

                if (text === "DE") {
                    $link.attr("data-lang", "de").attr("data-i18n", "lang.de");
                }
                if (text === "EN") {
                    $link.attr("data-lang", "en").attr("data-i18n", "lang.en");
                }
            });

            return;
        }

        $("#navbar").append(
            '<ul class="nav navbar-nav navbar-right language-selector">' +
            '<li><a href="#" data-lang="de" data-i18n="lang.de">DE</a></li>' +
            '<li class="lang-sep"><a>|</a></li>' +
            '<li><a href="#" data-lang="en" data-i18n="lang.en">EN</a></li>' +
            '</ul>'
        );
    }

    function updateLanguageSelector(lang) {
        $(".language-selector a[data-lang]").attr("aria-current", "false").css("font-weight", "normal");
        $('.language-selector a[data-lang="' + lang + '"]').attr("aria-current", "true").css("font-weight", "bold");
    }

    function applyDataI18nTranslations(labels) {
        $("[data-i18n]").each(function () {
            var key = $(this).attr("data-i18n");

            if (key && hasOwn(labels, key)) {
                rememberOriginalContent($(this));
                setElementContent($(this), labels[key]);
            }
        });
    }

    function applyDirectContentTranslations(labels) {
        var contentLabels = labels.content || {};

        Object.keys(contentLabels).forEach(function (id) {
            var element = document.getElementById(id);

            if (element) {
                rememberOriginalContent($(element));
                setElementContent($(element), contentLabels[id]);
            }
        });
    }

    function applyAutomaticContentTranslations(lang, labels) {
        var contentLabels = labels.content || {};

        if (lang !== "en") {
            return;
        }

        $("[id]").each(function () {
            var id = this.id;
            var originalHtml;
            var translatedHtml;

            if (hasOwn(contentLabels, id)) {
                return;
            }

            originalHtml = $(this).html();
            if (!shouldAutoTranslateElement(this, id, originalHtml)) {
                return;
            }

            translatedHtml = translateGeneratedHtml(originalHtml, lang);
            if (translatedHtml === originalHtml) {
                return;
            }

            rememberOriginalContent($(this));
            $(this).html(translatedHtml);
        });
    }

    function applyPageTitle(labels) {
        var pageTitles = labels.page_titles || {};
        var currentPage = getCurrentPageName();

        if (hasOwn(pageTitles, currentPage)) {
            document.title = pageTitles[currentPage];
        }
    }

    function loadLanguage(lang) {
        return $.getJSON("Textressourcen/" + lang + ".json")
            .done(function (labels) {
                restoreTranslatedContent();
                applyDataI18nTranslations(labels);
                applyDirectContentTranslations(labels);
                applyAutomaticContentTranslations(lang, labels);
                applyPageTitle(labels);
                document.documentElement.setAttribute("lang", lang);
                localStorage.setItem("lang", lang);
                updateLanguageSelector(lang);
            })
            .fail(function () {
                console.error("Sprachdatei konnte nicht geladen werden:", lang);
            });
    }

    function setLanguage(lang) {
        loadLanguage(lang);
    }

    function isMobileNav() {
        return window.matchMedia("(max-width: 767px)").matches;
    }

    function closeAccordionItems() {
        $("#navbar > ul.navbar-nav > li.dropdown").removeClass("nav-accordion-open open").children("a.dropdown-toggle").attr("aria-expanded", "false");
    }

    function setupAccordionAttributes() {
        $("#navbar > ul.navbar-nav > li.dropdown").each(function (index) {
            var $item = $(this);
            var $toggle = $item.children("a.dropdown-toggle");
            var $menu = $item.children(".dropdown-menu");
            var menuId = $menu.attr("id");

            if (!menuId) {
                menuId = "nav-accordion-menu-" + index;
                $menu.attr("id", menuId);
            }

            $toggle.attr("aria-controls", menuId);

            if (!$toggle.attr("href")) {
                $toggle.attr("href", "#");
            }
        });
    }

    function syncAccordionMode() {
        if (!isMobileNav()) {
            closeAccordionItems();
        }
    }

    function bindEvents() {
        $(document).on("click", ".language-selector a[data-lang]", function (event) {
            event.preventDefault();
            setLanguage($(this).attr("data-lang"));
        });

        $(document).on("click", "#navbar > ul.navbar-nav > li.dropdown > a.dropdown-toggle", function (event) {
            if (!isMobileNav()) {
                return;
            }

            event.preventDefault();

            var $item = $(this).parent("li");
            var willOpen = !$item.hasClass("nav-accordion-open");

            closeAccordionItems();

            if (willOpen) {
                $item.addClass("nav-accordion-open open");
                $(this).attr("aria-expanded", "true");
            }
        });

        $(".navbar-toggle").on("click", function () {
            window.setTimeout(function () {
                if (!$(".navbar-collapse").hasClass("in")) {
                    closeAccordionItems();
                }
            }, 350);
        });

        $(window).on("resize", syncAccordionMode);
    }

    $(function () {
        ensureHorizontEntry();
        ensureLanguageSelector();
        applyDataI18nAttributes();
        setupAccordionAttributes();
        bindEvents();
        syncAccordionMode();
        ORIGINAL_PAGE_TITLE = document.title;

        loadLanguage(localStorage.getItem("lang") || "de");

        if (navigator.platform.indexOf("Win") !== -1) {
            $(".windows-show").show();
        }
        if (navigator.platform.indexOf("Mac") !== -1) {
            $(".mac-show").show();
        }
        if (navigator.platform.indexOf("Mac") === -1 && navigator.platform.indexOf("Win") === -1) {
            $(".others-show").show();
        }
    });
}(jQuery));
