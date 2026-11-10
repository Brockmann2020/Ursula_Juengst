(function ($) {
    var NAVIGATION_ITEMS = [
        {
            label: "Malerei",
            labelKey: "nav.painting",
            items: [
                { href: "Horizonte.html", label: "Horizont", labelKey: "nav.horizont", aliases: ["Horizont.html"] },
                { href: "Auferstehen.html", label: "Auf(er)stehen", labelKey: "nav.auferstehen" },
                { href: "Malen_gegen_die_Dunkelheit.html", label: "Malen gegen die Dunkelheit", labelKey: "nav.malen_gegen_die_dunkelheit" },
                { href: "Noli_me_tangere.html", label: "Noli me tangere", labelKey: "nav.noli_me_tangere" },
                { href: "Das_Schweigen_brechen.html", label: "Das Schweigen brechen", labelKey: "nav.das_schweigen_brechen" },
                { href: "Mariupol.html", label: "Mariupol", labelKey: "nav.mariupol" },
                { href: "Begegnungsspuren.html", label: "Begegnungspuren", labelKey: "nav.begegnungsspuren" },
                { href: "Corona.html", label: "Corona", labelKey: "nav.corona" },
                { href: "Fiesta_de_la_vida.html", label: "Fiesta de la vida", labelKey: "nav.fiesta_de_la_vida" },
                { href: "Sonnengesang.html", label: "Sonnengesang", labelKey: "nav.sonnengesang" },
                { href: "Primavera.html", label: "Primavera", labelKey: "nav.primavera" },
                { href: "Hochzeit_des_Lichts.html", label: "Hochzeit des Lichts", labelKey: "nav.hochzeit_des_lichts" },
                { href: "Elementare_Akkorde.html", label: "Elementare Akkorde", labelKey: "nav.elementare_akkorde" },
                { href: "Sternengeburt.html", label: "Sternengeburt", labelKey: "nav.sternengeburt" },
                { href: "Archaeologie.html", label: "Arch\u00e4ologie", labelKey: "nav.archaeologie" },
                { href: "Azulen.html", label: "Azulen", labelKey: "nav.azulen" },
                { href: "Zeichnungen.html", label: "Zeichnungen", labelKey: "nav.zeichnungen" }
            ]
        },
        {
            label: "Vita",
            labelKey: "nav.vita",
            items: [
                { href: "Biografie.html", label: "Biografie", labelKey: "nav.biografie" },
                { href: "Ausstellungen.html", label: "Ausstellungen", labelKey: "nav.ausstellungen" },
                { href: "Arbeitssituationen.html", label: "Arbeitssituationen", labelKey: "nav.arbeitssituationen" }
            ]
        },
        {
            label: "Publikationen",
            labelKey: "nav.publikationen",
            items: [
                { href: "Literatur.html", label: "B\u00fccher/Kataloge", labelKey: "nav.buecher_kataloge" },
                { href: "Flyer.html", label: "Flyer", labelKey: "nav.flyer" }
            ]
        },
        { href: "Kunst_am_Bau.html", label: "Kunst am Bau", labelKey: "nav.kunst_am_bau" },
        { href: "Presse.html", label: "Presse", labelKey: "nav.presse" },
        { href: "Filme.html", label: "Filme", labelKey: "nav.filme" },
        { href: "Kontakt.html", label: "Kontakt", labelKey: "nav.kontakt" },
        { href: "Aktuell.html", label: "Aktuell", labelKey: "nav.aktuell" },
        { href: "Statement.html", label: "Statement", labelKey: "nav.statement" }
    ];
    var I18N_BY_HREF = createHrefTranslationMap();
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
        [/\bErzbischof\b/g, "Archbishop"],
        [/((?:With|with) texts by [^\n<]*?)\bund\b/g, "$1and"],
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

    function createHrefTranslationMap() {
        var map = {};

        function addItem(item) {
            var aliases;

            if (item.items) {
                $.each(item.items, function (_, child) {
                    addItem(child);
                });
                return;
            }

            map[item.href] = item.labelKey;
            aliases = item.aliases || [];
            $.each(aliases, function (_, alias) {
                map[alias] = item.labelKey;
            });
        }

        $.each(NAVIGATION_ITEMS, function (_, item) {
            addItem(item);
        });

        return map;
    }

    function hasOwn(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }

    function normalizePageName(page) {
        var value = (page || "").split("?")[0].split("#")[0];
        return value.split("/").pop().toLowerCase();
    }

    function getCurrentPageName() {
        var path = window.location.pathname || "";
        var fileName = path.split("/").pop();

        return fileName || "index.html";
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
        $.each(TRANSLATED_ELEMENT_KEYS, function (_, key) {
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

        if (/^(navbar|wrapper|website_shared_header_tableGrid2snippet0|website_shared_footer_snippet2|index_snippet4|shared-site-header|shared-site-footer)$/.test(id)) {
            return false;
        }

        if ($(element).closest("#navbar, .navbar, .language-selector, .dropdown-menu, .carousel, .carousel-control, .carousel-indicators, #shared-site-header, #shared-site-footer").length) {
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

        $.each(MONTH_TRANSLATIONS_EN, function (_, entry) {
            translated = translated.replace(entry[0], entry[1]);
        });

        $.each(AUTO_TRANSLATIONS_EN, function (_, entry) {
            translated = translated.replace(entry[0], entry[1]);
        });

        translated = translated.replace(/\((\d+)-teilig\)/g, "($1 parts)");
        translated = translated.replace(/\b(\d+)-teilig\b/g, "$1 parts");
        translated = translated.replace(/\(Teil\s+(\d+)\)/g, "(Part $1)");

        return translated;
    }

    function renderLink(item) {
        var aliases = item.aliases && item.aliases.length ? ' data-nav-aliases="' + item.aliases.join(",") + '"' : "";

        return '<a href="' + item.href + '" target="_self" data-i18n="' + item.labelKey + '"' + aliases + ">" + item.label + "</a>";
    }

    function renderNavigationItems(items) {
        var html = "";

        $.each(items, function (_, item) {
            if (item.items) {
                html += '<li class="dropdown">';
                html += '<a class="dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-i18n="' + item.labelKey + '">' + item.label + "</a>";
                html += '<ul class="dropdown-menu">';
                html += renderNavigationItems(item.items);
                html += "</ul>";
                html += "</li>";
                return;
            }

            html += "<li>";
            html += renderLink(item);
            html += "</li>";
        });

        return html;
    }

    function buildLanguageSelectorMarkup() {
        return '<ul class="nav navbar-nav navbar-right language-selector">' +
            '<li><a href="#" data-lang="de" data-i18n="lang.de">DE</a></li>' +
            '<li class="lang-sep"><a>|</a></li>' +
            '<li><a href="#" data-lang="en" data-i18n="lang.en">EN</a></li>' +
            "</ul>";
    }

    function buildSharedHeaderMarkup() {
        return '<div class="container-fluid" id="shared-site-header">' +
            '<div class="row website_shared_header_section1">' +
            '<div class="website_shared_header_section1_column website_shared_header_section1_0 col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
            '<nav class="navbar navbar-default website_shared_header_dropdownmenu2 navbar-fixed-top">' +
            '<div class="container-fluid">' +
            '<div class="navbar-header">' +
            '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">' +
            '<span class="sr-only" data-i18n="nav.toggle_navigation">Toggle navigation</span>' +
            '<span class="icon-bar"></span>' +
            '<span class="icon-bar"></span>' +
            '<span class="icon-bar"></span>' +
            "</button>" +
            '<a class="navbar-brand" href="index.html">' +
            '<div class="website_shared_header_tableGrid2snippet0" id="website_shared_header_tableGrid2snippet0" data-i18n="site.artist_name">Ursula J\u00fcngst</div>' +
            "</a>" +
            "</div>" +
            '<div id="navbar" class="navbar-collapse collapse">' +
            '<ul class="nav navbar-nav">' + renderNavigationItems(NAVIGATION_ITEMS) + "</ul>" +
            buildLanguageSelectorMarkup() +
            "</div>" +
            "</div>" +
            "</nav>" +
            "</div>" +
            "</div>" +
            "</div>";
    }

    function buildSharedFooterMarkup() {
        return '<div class="container-fluid" id="shared-site-footer">' +
            '<div class="row website_shared_footer_section1">' +
            '<div class="website_shared_footer_section1_column website_shared_footer_section1_0 col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
            '<div class="website_shared_footer_snippet2" id="website_shared_footer_snippet2">' +
            '<a href="Impressum.html" target="_self" data-i18n="footer.impressum_datenschutz">&copy; by Ursula J\u00fcngst | Impressum & Datenschutz</a>' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    }

    function replaceSharedBlock($placeholder, html) {
        var $markup = $(html);

        if ($placeholder.length) {
            $placeholder.replaceWith($markup);
            return $markup;
        }

        return $();
    }

    function ensureSharedHeader() {
        var $placeholder = $("#shared-site-header");
        var $legacyContainer = $(".row.website_shared_header_section1").first().closest(".container-fluid");
        var $header;

        if ($placeholder.length) {
            $header = replaceSharedBlock($placeholder, buildSharedHeaderMarkup());
        } else if ($legacyContainer.length) {
            $header = replaceSharedBlock($legacyContainer, buildSharedHeaderMarkup());
        } else {
            $header = $();
        }

        if ($header.length || $(".row.website_shared_header_section1").length) {
            $("body").addClass("has-shared-site-header");
        }
    }

    function ensureSharedFooter() {
        var $placeholder = $("#shared-site-footer");
        var $legacyContainer = $(".row.website_shared_footer_section1").first().closest(".container-fluid");

        if ($placeholder.length) {
            replaceSharedBlock($placeholder, buildSharedFooterMarkup());
            return;
        }

        if ($legacyContainer.length) {
            replaceSharedBlock($legacyContainer, buildSharedFooterMarkup());
        }
    }

    function ensureLanguageSelector() {
        if ($(".language-selector").length || !$("#navbar").length) {
            return;
        }

        $("#navbar").append(buildLanguageSelectorMarkup());
    }

    function applyDataI18nAttributes() {
        $(".carousel-control.left .sr-only").attr("data-i18n", "carousel.previous");
        $(".carousel-control.right .sr-only").attr("data-i18n", "carousel.next");
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

        $.each(Object.keys(contentLabels), function (_, id) {
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
        return window.matchMedia && window.matchMedia("(max-width: 767px)").matches;
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
        });
    }

    function syncAccordionMode() {
        if (!isMobileNav()) {
            closeAccordionItems();
        }
    }

    function updateActiveNavigationState() {
        var currentPage = normalizePageName(getCurrentPageName());

        $("#navbar li").removeClass("current-page");

        $("#navbar a[href]").each(function () {
            var $link = $(this);
            var href = normalizePageName($link.attr("href"));
            var aliases = (($link.attr("data-nav-aliases") || "").split(","));
            var matches = href === currentPage;

            $.each(aliases, function (_, alias) {
                if (normalizePageName(alias) === currentPage) {
                    matches = true;
                    return false;
                }
            });

            if (!matches) {
                return;
            }

            $link.parent("li").addClass("current-page");
            $link.closest("li.dropdown").addClass("current-page");
            return false;
        });
    }

    function bindEvents() {
        $(document).on("click", ".language-selector a[data-lang]", function (event) {
            event.preventDefault();
            setLanguage($(this).attr("data-lang"));
        });

        $(document).on("click", "#navbar > ul.navbar-nav > li.dropdown > a.dropdown-toggle", function (event) {
            var $item;
            var willOpen;

            if (!isMobileNav()) {
                return;
            }

            event.preventDefault();

            $item = $(this).parent("li");
            willOpen = !$item.hasClass("nav-accordion-open");

            closeAccordionItems();

            if (willOpen) {
                $item.addClass("nav-accordion-open open");
                $(this).attr("aria-expanded", "true");
            }
        });

        $(document).on("click", ".navbar-toggle", function () {
            window.setTimeout(function () {
                if (!$(".navbar-collapse").hasClass("in")) {
                    closeAccordionItems();
                }
            }, 350);
        });

        $(window).on("resize", syncAccordionMode);
    }

    $(function () {
        ensureSharedHeader();
        ensureSharedFooter();
        ensureLanguageSelector();
        applyDataI18nAttributes();
        setupAccordionAttributes();
        updateActiveNavigationState();
        bindEvents();
        syncAccordionMode();
        ORIGINAL_PAGE_TITLE = document.title;
        window.setLanguage = setLanguage;

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
