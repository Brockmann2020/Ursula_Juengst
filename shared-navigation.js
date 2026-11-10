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
        [/Ateliershooting/g, "Studio photo shoot"],
        [/PDF\s+zur\s+Ansicht\s+und\s*(?:<br\s*\/?>\s*)?zum\s+Herunterladen/gi, "View and download PDF"],
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
            if (child.tagName === "BR") {
                return;
            }
            if (child.tagName === "A") {
                var grandChildren = child.children || [];
                var aSafe = true;
                $.each(grandChildren, function (_, gc) {
                    if (gc.tagName !== "BR") {
                        aSafe = false;
                        return false;
                    }
                });
                if (aSafe) {
                    return;
                }
            }
            isSafeLeaf = false;
            return false;
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

    var FALLBACK_LABELS = {"de": {"nav.toggle_navigation": "Navigation umschalten", "nav.painting": "Malerei", "nav.horizont": "Horizonte", "nav.auferstehen": "Auf(er)stehen", "nav.malen_gegen_die_dunkelheit": "Malen gegen die Dunkelheit", "nav.noli_me_tangere": "Noli me tangere", "nav.das_schweigen_brechen": "Das Schweigen brechen", "nav.mariupol": "Mariupol", "nav.begegnungsspuren": "Begegnungspuren", "nav.corona": "Corona", "nav.fiesta_de_la_vida": "Fiesta de la vida", "nav.sonnengesang": "Sonnengesang", "nav.primavera": "Primavera", "nav.hochzeit_des_lichts": "Hochzeit des Lichts", "nav.elementare_akkorde": "Elementare Akkorde", "nav.sternengeburt": "Sternengeburt", "nav.archaeologie": "Archäologie", "nav.azulen": "Azulen", "nav.zeichnungen": "Zeichnungen", "nav.vita": "Vita", "nav.biografie": "Biografie", "nav.ausstellungen": "Ausstellungen", "nav.arbeitssituationen": "Arbeitssituationen", "nav.publikationen": "Publikationen", "nav.buecher_kataloge": "Bücher/Kataloge", "nav.flyer": "Flyer", "nav.kunst_am_bau": "Kunst am Bau", "nav.presse": "Presse", "nav.filme": "Filme", "nav.kontakt": "Kontakt", "nav.aktuell": "Aktuell", "nav.statement": "Statement", "nav.language": "Sprache", "lang.de": "DE", "lang.en": "EN", "site.artist_name": "Ursula Jüngst", "carousel.previous": "Zurück", "carousel.next": "Weiter", "home.coda_award": "CODAaward 2021", "footer.impressum_datenschutz": "© by Ursula Jüngst | Impressum & Datenschutz"}, "en": {"nav.toggle_navigation": "Toggle navigation", "nav.painting": "Painting", "nav.horizont": "Horizonte", "nav.auferstehen": "Auf(er)stehen", "nav.malen_gegen_die_dunkelheit": "Malen gegen die Dunkelheit", "nav.noli_me_tangere": "Noli me tangere", "nav.das_schweigen_brechen": "Das Schweigen brechen", "nav.mariupol": "Mariupol", "nav.begegnungsspuren": "Begegnungsspuren", "nav.corona": "Corona", "nav.fiesta_de_la_vida": "Fiesta de la vida", "nav.sonnengesang": "Sonnengesang", "nav.primavera": "Primavera", "nav.hochzeit_des_lichts": "Hochzeit des Lichts", "nav.elementare_akkorde": "Elementare Akkorde", "nav.sternengeburt": "Sternengeburt", "nav.archaeologie": "Archäologie", "nav.azulen": "Azulen", "nav.zeichnungen": "Drawings", "nav.vita": "Biography", "nav.biografie": "Biography", "nav.ausstellungen": "Exhibitions", "nav.arbeitssituationen": "Work Situations", "nav.publikationen": "Publications", "nav.buecher_kataloge": "Books/Catalogues", "nav.flyer": "Flyers", "nav.kunst_am_bau": "Art in Architecture", "nav.presse": "Press", "nav.filme": "Films", "nav.kontakt": "Contact", "nav.aktuell": "News", "nav.statement": "Statement", "nav.language": "Language", "lang.de": "DE", "lang.en": "EN", "site.artist_name": "Ursula Jüngst", "carousel.previous": "Previous", "carousel.next": "Next", "home.coda_award": "CODA Award 2021", "footer.impressum_datenschutz": "© by Ursula Jüngst | Legal Notice & Data Protection", "page_titles": {"Aktuell.html": "News", "Arbeitssituationen.html": "Work Situations", "ArtKa_2017.html": "Art Karlsruhe 2017", "Ausstellungen.html": "Exhibitions", "Biografie.html": "Biography", "Filme.html": "Films", "Flyer.html": "Flyers", "Impressum.html": "Legal Notice & Privacy Policy", "Kontakt.html": "Contact", "Kunst_am_Bau.html": "Art in Architecture", "Literatur.html": "Books/Catalogues", "Presse.html": "Press", "Statement.html": "Statement", "Zeichnungen.html": "Drawings"}, "content": {"Aktuell_snippet43": "News", "Aktuell_miltenberg_location": "Miltenberg Museums", "Aktuell_miltenberg_title": "Ursula Jüngst. In Search of the Horizon.", "Aktuell_miltenberg_dates": "April 25, 2026 - January 14, 2027", "Aktuell_snippet91": "In 2026, Ursula Jüngst, who has already received multiple awards for her work, looks back on 40 years of intense striving for painterly expression. The museums in Miltenberg present not only previously unknown works from her current creative phase, but also trace her artistic path by placing newer works in dialogue with early paintings. These energetic works lead viewers into a fascinating state of self-forgetfulness. They celebrate painting, and again and again in the free, vibrant color forms and nuanced chromatic constellations there is the opportunity to discover a new \"horizon\". With her emotionally powerful paintings, the artist succeeds in setting hope and confidence against the terrors of world events. For the museums in Miltenberg, it is a great stroke of luck to be able to dedicate a major exhibition to this daughter of the town, especially in our difficult times.<br><br>A publication accompanying the exhibition is in preparation.", "Aktuell_snippet92": "A publication accompanying the exhibition is in preparation.", "Aktuell_snippet93": "Miltenberg Town Museum<br>Hauptstrasse 169 -175<br>63897 Miltenberg", "Aktuell_snippet93b": "Miltenberg Castle Museum<br>Conradyweg 20<br>63897 Miltenberg", "Aktuell_snippet94": "Opening hours Tuesday to Sunday 11 am to 4 pm<br><a href='https://www.museen-miltenberg.de' target=_self>www.museen-miltenberg.de</a>", "Aktuell_snippet84": "Opening on May 18, 2025 at 4:30 pm<br><br>Kloster Heidenheim - Münster St. Wunibald<br>Ringstrasse 8, 91719 Heidenheim<br>Phone: 09833 7709888<br>Opening hours:<br>Minster of St. Wunibald - daily from 8 am to 6 pm", "Aktuell_snippet87": "On Sunday, July 13, 2025 at 3:00 pm, the museum art mediator will guide visitors through the exhibition \"Ursula Jüngst - AUF(ER)STEHEN\".<br>From 4:00 pm there will be an opportunity to meet the artist in person.<br>The exhibition brings together more than 30 major works from recent years.<br>Among them are key works such as \"Schreck - Covid 19\", \"Noli me tangere\" and \"Auf der Suche nach dem Horizont\".<br><br>Buchheim Museum<br>Am Hirschgarten 1, 82347 Bernried<br>Phone: +49 8158 997043", "Aktuell_snippet75": "Buchheim Museum<br>Am Hirschgarten 1, 82347 Bernried<br>Phone: +49 8158 997043<br>Exhibition opening on April 4 at 5 pm<br>A catalogue will be published for the exhibition<br>Opening hours:<br>Tuesday to Sunday and public holidays from 10 am to 6 pm", "Aktuell_snippet61": "Opening on January 12, 2025 at 12 pm | Triptych \"Mariupol\", chancel of Herz Jesu, Erlangen | Narbe, 2024, Oil on canvas, 120 x 90 cm<br><br>Herz Jesu Church<br>Katholischer Kirchenplatz 8, 91054 Erlangen<br>Phone: 09131 977 999-0<br>Opening hours:<br>Daily from 9 am to 5 pm and during church services", "Aktuell_tableGrid33snippet0": "Warm invitation to the artist talk on September 14, 2024 at 7:30 pm in St. Johannis Church, Schweinfurt", "Aktuell_snippet64": "Insights into the exhibition \"Malen gegen die Dunkelheit\"<br><br>The exhibition presents around thirty paintings, some of them multipart, by the artist Ursula Jüngst, who lives and works in Nuremberg and Barcelona.<br>Within contemporary art, Ursula Jüngst's painting is distinctive for its luminosity and her striking brushstroke. Similar in length and width, the brushstroke is her artistic building block, enabling her to shape the subtlest emotions with great sensitivity and fullness. The emotional depth of her paintings is enriched by the flowing traces she employs.<br>She is able to transform traces that evoke blood and tears into lines of encounter and finally into something like fishing lines of light.<br>Her paintings, such as the cycle \"Mariupol\" or the works \"Zeig mir deine Wunde\" and \"Dies irae, dies illa\", reflect urgent existential questions of our society. In this exhibition, Ursula Jüngst's works enter into an exciting dialogue with the historical works from the museum collection and open up new ways of seeing.<br>Her paintings touch us deeply in our humanity.<br><br>Would you like to book a guided tour of the special exhibition?<br>Then please contact 05251 125-1400 or museum@erzbistum-paderborn.de<br><br>Diocesan Museum Paderborn<br>Markt 17 · 33098 Paderborn<br>Phone: 05251 125-1400", "Aktuell_snippet51": "In her latest works, the Nuremberg painter Ursula Jüngst engages intensely with the crises of our immediate present: in the ten-part monumental painting \"Schreck - Covid 19\", for example, she experiments both with format and with the process of applying paint, which was carried out from a fixed distance using a telescopic pole. The struggle with the canvas, which metaphorically also stands for the tension of the coronavirus pandemic, unfolds as a forceful dramaturgy of color ranging from delicate to aggressive tones, executed in countless brush gestures that collide as compositional forms.<br>Here Ursula Jüngst is entirely in her element: generating opposing energies through arrangements of complex brushstrokes, impasto or glazed applications of color, and confidently guided flowing traces. Her painterly interventions do grant chance a role, but translate it into a consciously controlled pictorial structure and composition that remains classical in this sense and yet contemporary. With an introductory essay by the art historian Erich Schneider.<br><br>Edited by Erich Schneider. Published by modo Verlag.<br>200 pages, 136 illustrations, German / English<br>Portrait format 24 x 30 cm, hardcover, thread-sewn binding.<br>ISBN 978-3-86833-331-2", "Aktuell_snippet55": "First printed sheets for the book \"Ariadnefäden des Lichts\" at Pustet in Regensburg", "Aktuell_tableGrid31snippet0": "The new monograph is here!", "Aktuell_tableGrid31snippet2": "Paintings by Ursula Jüngst", "Aktuell_tableGrid34snippet0": "New paintings", "Aktuell_snippet44": "Presentation of the paintings at the studio in Spain", "Aktuell_snippet45": "Works by Ursula Jüngst in Heilsbronn Minster<br>", "Aktuell_tableGrid54snippet1": "Color proofing of the new monograph", "Aktuell_tableGrid38snippet0": "CODA Award - Winner 2021", "Aktuell_snippet39": "The stained-glass painting \"Feier des Lebens\" by Ursula Jüngst, in the baptistry of All Saints Parish Church in Nuremberg, received first place in the category \"liturgical\" among the artworks selected by an international expert jury.", "Aktuell_snippet40": "\"The beauty of this glass art is that it IS the architecture - not merely an additional ornament or window decoration, but an essential structural element - glorious, translucent, strong and self-supporting.\"<br>- Ilene Shaw, Producer, New York By Design: Architecture<br><br>From 40 countries, 100 of the most successful art, architecture and design projects were selected that integrate commissioned art into an interior, architectural or public space. Commissioned Art Matters - and the CODA Awards celebrate exactly that. The CODA Awards program honors individuals and teams who create spaces that inspire us anew every day.", "Aktuell_snippet41": "<a href='https://www.codaworx.com/projects/all-saints-church-11512' target=_self>Link: CODA Award Winner 2021</a>", "Aktuell_snippet42": "<a href='https://www.derix.com/?s=ursula+j%C3%BCngst&lang=de' target=_self>Link: Derix Glass Studios</a>", "Arbeitssituationen_snippet10": "Work Situations", "ArtKa_2017_snippet62": "Film report on the painter Ursula Jüngst", "ArtKa_2017_snippet64": "Works at the art fair", "ArtKa_2017_snippet68": "On the painting of Ursula Jüngst", "ArtKa_2017_snippet69": "Within contemporary art, Ursula Jüngst, who has been exploring painterly positions for more than thirty years, occupies a special place because of her distinctive visual language. Her paintings are powerful in their decisiveness. They show a creative handling of a broad spectrum of intense colors that follow inner impulses. Her knowledge of color relationships and their effect enriches them further.<br><br>The current trademark of the artist, who lives in Nuremberg and Barcelona, is her brushstrokes, similar in length and width. Through repetition and rhythm they acquire formal meaning. The brushwork takes on the status of a building block. It is her module, which can be combined in form and function. Art criticism highlights this innovative contribution and quite rightly speaks of the \"brushstroke as a world formula\".<br><br>With this broad brushstroke, Ursula Jüngst has taken an important step. Color and form are available as autonomous means. In contrast to a representation close to nature, they stand independently of time and place as living bodies of color and form. Articulated emotional values channel themselves into brush movements.", "ArtKa_2017_snippet70": "In a kind of dance of color, the experimental painter surrenders to the process of encountering colors. She investigates the effect of different tonal nuances and is repeatedly surprised by her own discoveries.<br><br>Numerous strokes organize themselves, in changing directions and varying density of paint application, into a flowing together. Individual brush marks often contain traces of colors blending into one another. The color progression of single brushstrokes can change. They may approach the neighboring color, be related to it, or set themselves off in complementary contrast. In the variety thus gained and in the complexity of their relationships, they generate an increasingly shimmering effect.<br><br>The paintings break open what is familiar and invite free associations. They address fundamental states of human existence and are an expression of modern life. We become participants in a celebration of painting.<br><br>Bert Schlichtenmaier, Stuttgart", "ArtKa_2017_snippet114": "Elementare Akkorde<br>Paintings by Ursula Jüngst", "ArtKa_2017_snippet113": "With texts by Dieter Hoffmann, Ursula Jüngst, Annette Schavan,<br>Bert Schlichtenmaier. 112 pages, 57 illustrations, 24 x 28 cm,<br>German, clothbound with dust jacket, thread-sewn binding.<br><br>modo Verlag GmbH Freiburg i.Br.<br>ISBN 978-3-86833-182-0<br><br>October 2015", "Ausstellungen_snippet5": "Exhibitions", "Biografie_snippet4": "Biography<br>", "Biografie_snippet6": "1965<br>born in Miltenberg<br><br>1986 - 1993<br>Studied at the Academy of Fine Arts<br>in Nuremberg with Prof. H.P. Reuter<br><br>1989<br>Scholarship from Cusanuswerk, Bonn<br><br>1991 - 1992<br>Studied at the Universidad de Barcelona<br>and at the Escola de Llotja (Spain)<br><br>1992<br>Laufer Art Prize<br>Master student of Prof. H.P. Reuter<br><br>1994<br>Award from the City of Plettenberg<br><br>USA scholarship<br>from the Bavarian State Ministry<br><br>1996<br>Stay in Russia<br><br>1998<br>Visiting lectureship at Perm Art Academy (Russia)<br><br>2000 - 2013<br>Head of the model project \"Painting with seriously ill<br>children and adolescents\" at Nuremberg Hospital<br><br>2002<br>Specialist advisor in the European project<br>\"Spaces to live\"<br><br>2003<br>Art Prize of Nürnberger Nachrichten<br><br>2008<br>Special Prize of the publisher of Nürnberger Nachrichten<br><br>2009<br>Artist exchange, Skopje (North Macedonia)<br><br>2017<br>Engagement with stained glass<br><br>2018 - 2020<br>Design of the window \"Feier des Lebens\"<br>for All Saints Parish Church in Nuremberg<br><br>2021<br>Winner of the CODA Award (New York)<br>with the stained-glass painting \"Feier des Lebens\"<br><br>2025<br>Eva-Maria-Roer Prize<br><br>2026<br>Start of designing the window \"Horizont\"<br>for Glashütte Lamberts in Waldsassen<br><br>lives and works in Nuremberg and Barcelona", "Begegnungsspuren_snippet31": "Painting is for me a way of reflecting on the world. To discover and experience new things, to remember and clarify. To try to get to the bottom of being. The picture develops in the dialogue between the colors, the support and myself.<br>Because of the experience of the corona lockdown and the consequences associated with it - for example, that it was forbidden even to visit seriously ill relatives - my democratic basic feeling was shaken. My brushstroke, my artistic formula for the world, began to slip. The basic module of my compositions started to wobble.<br>In places, my brush marks now begin to flow. Fine, careful, trembling traces of flow bring something nervous and fragile into the pictorial structure and make the distinct brushstrokes vibrate. Traces of encounter. Purposeful, self-confident rivulets become strings of sound, fishing lines of light, and lassos for my brush chords. Attempts at new forms of encounter.", "Corona_snippet15": "Schreck - Covid 19. Everything changed. Within Europe the borders closed. Schengen no longer counted. Shutdown. Locking away. Alone. Daily images of death in the media. Turning away instead of turning toward one another. Bergamo. Madrid. Hotspot after hotspot. Isolation became normal. Distance became charity. A society of distance.<br>My brushes are extended to two meters. A red line marks the distance of two meters from the painting surface. 10 panels. 10 like two families together. 10 like a meeting group. Each panel is proportionally similar to a human being. To a coffin. The individual panels are separated and yet belong together. The shock is deep and struggles with the light. The stillness is threatening. I paint with the distance brush. It is difficult to cope with distance. The application of paint becomes rougher. Immersed in painting, I sometimes step across the distancing line. That allows me to conjure the delicate fusion of colors. Keeping one's distance is hard.", "Filme_snippet18": "Films", "Flyer_snippet10": "Flyers", "Impressum_snippet4": "Legal Notice & Privacy Policy", "Impressum_snippet8": "Privacy Policy", "Impressum_snippet6": "Responsible for content and design:<br><br>Ursula Jüngst<br>Steinstrasse 21<br>Haus B / 3rd floor<br>90419 Nuremberg<br><br>Phone: +49 (0) 911 46 43 80<br>Mobile: +49 (0) 151 4185 4905<br><br>Email: ursula.juengst@t-online.de<br>Website: www.ursula-juengst.com<br><br>Despite careful control of content, I assume no liability<br>for the content of external links. The operators of the linked pages<br>are solely responsible for their content.<br><br>All texts, images and graphics as well as their arrangement on this<br>website are protected by copyright and other protective laws.<br>The content of this website may not be copied, distributed or modified<br>for commercial purposes.<br><br>The content and structure of this website are protected by copyright.<br>The reproduction of information or data, in particular the use of images,<br>texts or parts of texts, requires the prior consent of Ursula Jüngst.<br><br>Copyright © Ursula Jüngst 2018", "Impressum_snippet7": "Privacy Policy<br><br>On the internet, users can quickly lose track of where and for what purpose their data is stored. I would therefore like to explain to you, as a visitor to my website, how I ensure the confidentiality of your personal data.<br>Complying with the provisions of the EU General Data Protection Regulation (GDPR) and the German Federal Data Protection Act is self-evident for me. Below I provide information about this.<br><br>Data Protection<br><br>Ursula Jüngst takes the protection of your personal data very seriously. I treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.<br>Using my website is generally possible without providing personal data. As far as personal data is collected on my pages (for example name, address or email addresses), this is always done on a voluntary basis whenever possible. This data will not be passed on to third parties without your express consent.<br>Please note that data transmission on the internet (for example communication by email) may have security gaps. Complete protection of data against access by third parties is not possible. I assume no liability for any damage that may arise from this. The website operator expressly reserves the right to take legal action in the event of unsolicited advertising information being sent, for example via spam emails.<br><br>Right to Information, Deletion and Blocking<br><br>You have the right at any time to receive information free of charge about your stored personal data, its origin and recipients, and the purpose of the data processing, as well as a right to correction, blocking or deletion of this data. For this and for any further questions on the subject of personal data, you can contact me at any time at the address given in the legal notice.<br><br>Server Log Files<br><br>The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:<br>Browser type and browser version<br>Operating system used<br>Referrer URL<br>Hostname of the accessing computer<br>Time of the server request<br>This data cannot be assigned to specific persons. This data is not merged with other data sources. I reserve the right to check this data retrospectively if concrete indications of unlawful use become known.<br><br>Requests by Email<br><br>If you send me inquiries by email, your details from the inquiry, including the contact data you provide there, will be stored by me for the purpose of processing the inquiry and in case of follow-up questions. I will not pass this data on without your consent.<br><br>YouTube<br><br>My website uses plugins from the site YouTube operated by Google. The operator of the pages is YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA. When you visit one of my pages equipped with a YouTube plugin, a connection to the YouTube servers is established. The YouTube server is informed which of my pages you have visited. If you are logged into your YouTube account, you enable YouTube to assign your browsing behavior directly to your personal profile. You can prevent this by logging out of your YouTube account.<br>Further information on the handling of user data can be found in YouTube's privacy policy at: https://policies.google.com/privacy?hl=en<br><br>Google Web Fonts<br><br>This site uses so-called web fonts provided by Google for the uniform display of fonts. When you call up a page, your browser loads the required web fonts into your browser cache in order to display texts and fonts correctly. For this purpose, the browser you use must connect to Google's servers. This gives Google knowledge that my website has been accessed via your IP address. The use of Google Web Fonts is in the interest of a uniform and attractive presentation of my online content. This constitutes a legitimate interest within the meaning of Art. 6 para. 1 lit. f GDPR. If your browser does not support web fonts, a standard font from your computer will be used.<br>Further information on Google Web Fonts can be found at https://developers.google.com/fonts/faq and in Google's privacy policy: https://www.google.com/policies/privacy/.<br><br>Links to Third Parties<br><br>If my website contains links to third-party websites, this privacy policy does not apply to those third-party websites.<br><br>Use of Cookies<br><br>Cookies are small files stored on the internet user's computer and can be used as identifiers. I do not currently use cookies.<br><br>Updating this Privacy Policy<br><br>If I introduce new products or services, change internet procedures, or if internet and IT security technology develops further, this privacy policy will be updated accordingly.", "Kontakt_snippet5": "Contact", "Kontakt_snippet12": "Phone:", "Kontakt_snippet13": "Email:", "Kunst_am_Bau_snippet25": "Window of the baptistry in All Saints Parish Church in Nuremberg", "Kunst_am_Bau_tableGrid60snippet0": "CODA Award - Winner 2021", "Kunst_am_Bau_snippet61": "The stained-glass painting \"Feier des Lebens\" by Ursula Jüngst, in the baptistry of All Saints Parish Church in Nuremberg, received first place in the category \"liturgical\" among the artworks selected by an international expert jury.", "Kunst_am_Bau_snippet59": "\"The beauty of this glass art is that it IS the architecture - not merely an additional ornament or window decoration, but an essential structural element - glorious, translucent, strong and self-supporting.\"<br>- Ilene Shaw, Producer, New York By Design: Architecture<br><br>From 40 countries, 100 of the most successful art, architecture and design projects were selected that integrate commissioned art into an interior, architectural or public space. Commissioned Art Matters - and the CODA Awards celebrate exactly that. The CODA Awards program honors individuals and teams who create spaces that inspire us anew every day.", "Kunst_am_Bau_tableGrid34snippet0": "More information:", "Kunst_am_Bau_snippet54": "Installation of the stained-glass painting in the baptistry, Nuremberg 2020", "Kunst_am_Bau_snippet39": "Transfer of the painting \"Fiesta de la vida\" onto glass in collaboration with Derix Glasstudio.", "Kunst_am_Bau_snippet51": "Test assembly of all 120 glass panes, Taunusstein 2020", "Kunst_am_Bau_snippet50": "Working in the painterly intermediate nuances, Taunusstein 2020<br>", "Kunst_am_Bau_snippet53": "Assembly of the etched blue and yellow glass, Taunusstein 2020", "Kunst_am_Bau_snippet52": "Masking with asphalt varnish and removing the flashed layer, Taunusstein 2019<br>", "Kunst_am_Bau_snippet40": "Painting for the stained-glass window of the baptistry of All Saints Parish Church in Nuremberg<br>", "Literatur_snippet29": "Books/Catalogues", "Literatur_tiepolo_title": "URSULA JÜNGST | TIEPOLO<br>DIE RHYTHMEN DER WELT", "Literatur_tiepolo_text": "This publication accompanies the exhibition on view until January 31, 2027 at the Martin von Wagner Museum of the University of Würzburg. The paintings shown enter into a profound dialogue with the monumental ceiling painting in the staircase of the Residence – not by way of imitation, but through related formal principles and thematic motivations. Like Tiepolo, albeit with changed artistic means, the painter creates phenomena such as expanse, immersiveness and all-sidedness. In the works of both, shaping the world and reflecting upon its inner interconnections hold each other in balance. And just as the staircase fresco of the Würzburg Residence outlines a highly topical model of the world, Ursula Jüngst links her painting with her and our relationship to the world. With her painting, as humane as it is universally oriented, she encounters an ally in Giambattista Tiepolo.<br><br>With texts by Prof. Dr. Damian Dombrowski, Dr. Joachim Kuhn and Ursula Jüngst.<br><br>100 pages, 66 illustrations, 21 x 26 cm, German, thread-sewn binding<br><br>Harrassowitz Verlag GmbH, Wiesbaden. ISBN 978-3-447-12615-1<br><br>October 2026<br><br>The catalogue is also available through the Martin von Wagner Museum of the University of Würzburg.", "Literatur_tableGrid91snippet1": "Großes Orchester<br><br>For a painter living in the Renaissance or the Baroque period, staging great themes on great surfaces belonged to the challenges he regularly had to face - or perhaps was even allowed to face. One need only think of Michelangelo's works in the Sistine Chapel in Rome or, to bridge to the end of that epoch, Tiepolo's fresco in the staircase of the Würzburg Residence. Timeless fame was achieved above all by an artist who excelled in this field as well.<br>With the end of the Baroque period, the great ceiling fresco also disappeared; other tasks moved to the foreground for art. After art had once again detached itself from decoration in Classicism and Historicism - and leaving aside entirely what Nazi monumentalism produced - free art in the second half of the twentieth century again sought the large format: Georg Meistermann led the way between 1953 and 1956 with his immense stained-glass window \"Pfingsten\" in St. Kilian in Schweinfurt. From the 1970s onward Hans Hartung created his huge abstract-expressionist works in Antibes, and between 1989 and 1991 Fred Thieler painted \"Nachthimmel\" in the Munich Residence.<br>And then there is an artist like Ursula Jüngst, who since studying with Hans Peter Reuter at the Nuremberg Academy has, out of inner conviction and simply because she wants to, repeatedly placed large formats at the center of her work. An early example of her independent artistic practice is the work \"Vulkangeflüster\" from 2003, which developed into a panoramic painting fifteen meters long and two meters high. This work already appears unusually mature and anticipates much of what continues to characterize Ursula Jüngst's oeuvre in a consistent further development to this day.<br>Her paintings come into being over a long period of time. She stretches the canvases herself and applies several layers of primer in order to give the support its own breath from the very beginning. Then, in the actual painterly process, she acts in an interplay between open experiment and consciously controlled brush marks. If, in this dialogue, her eye remains stuck on a single brushstroke, then the picture is not yet finished. In her view, it is only successful once the gaze can move through the picture with ease.", "Literatur_tableGrid87snippet1": "FIESTA DE LA VIDA<br><br>At the center of Ursula Jüngst's presentation of painting stands the work \"Fiesta de la Vida\", shown in the Nikolaus Chapel, which was completed in 2018 and is being presented to the public for the first time.", "Literatur_tableGrid83snippet1": "Licht ist dein Kleid<br><br>Light is the garment you wear. You spread out the heavens like a tent; you build your chambers above the waters. You ride on the clouds as on a chariot and come forth on the wings of the wind, you make winds your messengers and flames of fire your servants; you founded the earth upon its firm ground so that it shall not totter forever and ever.", "Literatur_tableGrid30snippet1": "Ursula Jüngst, who works in Nuremberg and Barcelona, has made an innovative contribution to the formative power of color. For more than thirty years, the artist, born in Miltenberg in 1965, has explored painterly positions. Her paintings are expressions of the modern attitude to life in the present. They address fundamental questions and can be understood as \"Elementare Akkorde\".<br>Her pictures are recognizable by their brushstroke. Over the past ten years it has become a trademark. In a kind of dance of color, the experimental painter enters into the process of encountering colors, which for her are carriers of sensation. They appear shimmering, provocative or tender. They mix and organize themselves into a flowing together and radiate an enlivening effect.<br>In 2013 Ursula Jüngst resumed her engagement with large format. A characteristic feature is being \"in the middle of the picture\", being swept along and experiencing the orchestra of colors intensely, sensually tangible and plastically relief-like in the room.<br>The publication not only presents new works by the artist, it also shows where they were created and, in detail, how the different colors react to one another. Between the works, essays and interviews through which one can approach the artist's oeuvre, there are also the painter's own comments on her pictures: \"The cicada sings its midday song. Shrill. Cobalt blue bites red. The sun is glaring and hot. Time seems to have stopped, the moment endless.\"", "Literatur_tableGrid38snippet1": "Farbe meine Sprache - Unendliche Impressionen<br><br>\"Colour as the object of painting is the constituent subject in the works of Ursula Jüngst. Her latest works originated in this context: a multitude of strong, nearly equally long, straight brushstrokes placed next to or above each other in a controlled way - a meticulous technique that she elaborated during the last two years. With intensive colours, rich in contrast, she models complex colour fields and structures that look freer and more concrete in her current phase of work. The colours blend in a subtle way, because traces of the already painted colours flash up again and again from underneath the lower layers. With a comprehensive system of singular brushstrokes, huge abstract colour landscapes rich in contrast come into being. They align with traces of movement and make the process of painting visible. The maximal size of these pictures is guided by the radius of gestural movement while painting. Coloured areas form the basic composition, which is then structured by the accumulation of individual brushstrokes. With impressionistic gesture Ursula Jüngst adds stroke to stroke, colour to colour, and models iridescent colour fields with thick applications of paint repeated hundreds and thousands of times. She develops these fields harmoniously within a range from yellow to red, from green to blue, or contrasts autonomous structures with complementary effects, light-dark or cold-warm contrasts and independent colour values...\"<br><br>Christoph Schneider, Freiburg, August 2011", "Literatur_tableGrid45snippet1": "Sternengeburt<br><br>\"Looking at the new paintings by Ursula Jüngst from the years 2007 and 2008, one experiences a true flush of colors. Color is and remains the painter's source of impulse. Even more clearly than in her earlier oeuvre, the latest works reveal an intensification of chromatic energy.<br>Alongside this richness of colors, the painter's brushwork is a decisive, tone-setting instrument. Compared with works from previous years, the ductus has shortened, appears more concise and heightens the energetic coloring through its swirling traces of movement. The brushstroke is immediate: it dynamizes the picture surface, it orders, just as it simultaneously questions any system...\"<br><br>Barbara Leicht M.A., curator, Kunstmuseum Erlangen", "Literatur_tableGrid75snippet1": "Die Azulen<br><br>...In the second large group of works, the \"Azulen\", to which this catalogue is devoted, the artist consciously tries to keep such associations largely at bay. At first glance they appear much calmer because of their relatively monochrome color fields, created through several, yet much thinner layers of paint.<br>Closer observation, however, teaches otherwise, because the large color fields that appear monochrome reveal within a single hue a rich play of nuances and again and again allow the layers of color underneath to resonate through them, so that the viewer's eye wanders on a true journey of discovery through luminous spaces of color...<br><br>Dr. Cornelia Vagt-Beck,<br>art historian", "Literatur_tableGrid79snippet1": "Zeichnungen<br><br>...My drawings emerge parallel to my large oil paintings. They are really like a \"diary\". In drawing, I try to respond spontaneously to impressions, to make feelings and thoughts visible that are still veiled even to myself, and to understand them myself...<br><br>Ursula Jüngst", "Literatur_tableGrid103snippet1": "Archäologie des Unbewußten<br><br>...Courage in the face of the risk of failure characterizes Ursula Jüngst's work. She exposes herself to color, lives within it. The pictures develop without a fixed concept, purely from the act of painting and from constant dialogue with colors. In this process, enigmatic forms are born from superimposed colors and the ductus of the brush - forms that seem tangible and yet elude clear definition, comparable to cloud images. Evidently, a force emanates from these pictures, rooted in the intensity and range of their colors, from Mediterranean brightness to the darkest tunnel of death. Many viewers seem to gain an intimation, in the aesthetics of Ursula Jüngst's pictures, of the \"archaeology of the unconscious\" in its depth-psychological, metaphysical and religious dimension. Encountering these pictures opens existential spaces within us through aesthetic experience. In this respect, Ursula Jüngst's works differ refreshingly from contemporary currents of post-structural arbitrariness. They show that the possibilities of color and painting - currently often pushed aside in the art world in favor of ready-mades, concept art, computer animation and the like - are far from exhausted and in fact allow for new departures. They are modern because they address human beings in their emptiness and metaphysical homelessness.<br><br>Dr. Karl v. Schmölling", "Presse_snippet14": "Press", "Presse_snippet_art5drei2026": "ART 5III, November 6, 2026", "Presse_snippet_mainpost2026": "Main Post Würzburg, October 30, 2026", "Presse_snippet21": "<a href='/Presse/Ursula_Juengst_Malen_gegen_die_Dunkelheit_DerDom.pdf' target=_self>Der Dom, March 21, 2024 - click here to read</a>", "Presse_snippet28": "<a href='https://www.nordbayern.de/ein-glasbild-der-besonderen-art-1.9959444' target=_self>Nürnberger Nachrichten, March 20, 2020 - click here to read: www.nordbayern.de</a>", "Statement_snippet34": "In Search of the Horizon", "Statement_snippet35": "While painting, I pull the ground out from under myself, making upside-down placements and complementary collisions. In doing so, I lose what I had already found. How do I deal with decay and destruction? What happens when my previous experiences and orientations no longer hold true? It presses in on me from all sides. I let streams of color flow and am compelled to redefine the compositional structure. I explore the unknown.<br><br>Ursula Jüngst, March 2026<br><br>", "Statement_snippet33": "Painting against madness", "Statement_snippet28": "Our world seems to be undergoing a reordering, and I, too, redefine points of orientation in my works. During the painting process I repeatedly determine what is above and below all over again - especially when I feel that a flowing trace should move against gravity. While painting I scrape along the edge of chaos and search for new bearings. In doing so, my brush marks and flowing traces shape the rhythmic structure of my paintings. Above and below, front and back begin to vibrate together. In the interplay of paint traces and colors, I try to find the horizon.<br><br>Ursula Jüngst, February 2025", "Statement_snippet32": "Painting against the darkness", "Statement_snippet30": "With brush and colors, placements and flowing traces, I venture into places and feelings unfamiliar to me. In doing so, I experience terror, transience, pain and fear, but also joy, tenderness and strength. I am touched and able to touch, to take part, to respect, to discover, to resist. It is my way of encountering the world with questions and also with love. <br>I want to paint against the dark, the tornness, the speechlessness, the annihilating cold. Painting carries within it the power of renewal. I see my brush marks and flowing lines as forms through which to explore new possibilities of encounter.<br><br><br>Ursula Jüngst, March 2024", "Statement_snippet31": "Scar, 2024, Oil on canvas, 120 x 90 cm", "Statement_snippet23": "Painting at the nerve of the times", "Statement_snippet21": "My paintings - even if they may at first glance look like plays of color - are my commentary on the current crisis-ridden state of our world. They are painterly interventions into the events of my present.<br><br>I am not a storyteller and I do not take the detour of representational depiction. In the act of painting I trust the forces inherent in the material and intensify them.<br><br>For me, painting is a field of experimentation for questions of being. In a balancing act between control and loss of control, between preserving, discovering, shaping and destroying, I conduct my artistic means. These are my distinctive brushstrokes and my dancing traces of flow, which are reworked several times in the painterly process and thus intensify the expression. One might see the brushstrokes as stand-ins for people with all their different experiences and possibilities. The flowing lines create new forms of encounter, making the subtlest stirrings and also inevitability visible. My artistic means of expression are consciously shaped right to the outermost edges of the format and carry respect and consideration.<br><br>Together with the brush marks and traces of flow, the deliberately chosen colors become mediators of rich and subtle sensations and developed attitudes. In the mutual permeation of colors and forms, a luminous, energetic tonal space of color opens up. Free of spatial localization, this compositional structure oscillates and thus creates ever new possibilities of viewing. At the same time light plays in the image, changing from front to back, penetrating the pictorial space and spreading outward.<br><br>In my paintings I try to find an adequate expression for these burdensome times and to paint against dark experiences - setting the hopeful force of light and of uplifting wonder against powerlessness, decay and aggression.<br><br>Ursula Jüngst, July 2023", "Statement_snippet16": "Painting is of the present", "Statement_snippet15": "I want my painting to reach people and meet them where their feelings are today.<br>Painting is a language that speaks directly to people's hearts. Art is a way of keeping doors open, even where communication no longer works. For me, painting is also an expression of love and of the conviction that art contains the power to counter absurdity and arbitrariness.", "Statement_snippet17": "The painting \"Schlaf mein Kind auch wenn der Teufel lacht\" (already painted in 2020) fits our times exactly. In this painting I try to express the feelings of a mother - of a protector - who attempts to safeguard her child, the dearest and most vulnerable thing, in spite of all adversity, all madness, all fears and all impossibility.<br>", "Statement_snippet20": "\"For heaven's sake\" - \"Um Himmels willen\" - an exclamation that may once have seemed emptied out, but which in the face of one's own powerlessness and loss of composure gains new meaning precisely now. In this painting, created at the end of last year, vehement dark brushstrokes are set down and in places begin to flow, evoking tears and the passage of time, perhaps also its decay. Yet the frightening black is confronted by fresh life-affirming yellow, delicate pink and green, the color of incipient love. The flowing traces are transformed and become fishing lines of light.<br><br>Ursula Jüngst, August 2022", "Zeichnungen_snippet11": "Drawings", "website_shared_header_snippet9": "Film report", "website_shared_header_snippet8": "Works", "website_shared_header_snippet7": "Publication", "website_shared_header_snippet6": "Email", "Literatur_snippet106": "With texts by Prof. Dr. Erich Schneider, Archbishop Dr. Markus Bentz and Ursula Jüngst. <br>84 pages, 49 illustrations, 21.5 x 28 cm, German, hardcover, thread-sewn binding.<br><br>Buchheim Verlag, Bernried<br>ISBN 978-3-7659-1116-3<br><br>April 2025", "Literatur_tableGrid34snippet1": "<br>Studio Visit with Ursula Jüngst<br><br>»The light is there, and the colors surround us; yet if we bore no light and no colors in our own eye, we would not perceive any such thing outside ourselves either.«<br>(Goethe in conversation with Eckermann, February 26, 1824)<br><br>In the Nuremberg district of St. Johannis, somewhat hidden in the quiet courtyard of a side street, lies the studio of Ursula Jüngst. It is located in the former Bavarian Metalware Factory. The large, high, bright rooms receive their light from the west through a wide window front spanning the entire length of the space. When the sun stands low in the afternoon, working on the large paintings becomes more difficult. The orange light of the sun makes the effect of the colors extreme—the yellow screaming, the red fiery—so that the colors appear pale and powerful at the same time. For Ursula Jüngst, color is of elemental significance. So as not to jeopardize the specific effect of the colors, the artistic work must be interrupted. Anyone familiar with her working process can understand this. The brushstrokes, which upon first and superficial viewing appear arbitrary, are in fact applied to the support with control and subtlety. The paintings are composed down to the very last detail. Often the artist applies the colors several times with a strong brushstroke. At times this creates the impression that her works have been applied with a palette knife. The surface acquires structure and a relief-like quality. In raking light, individual brushstrokes stand out particularly clearly and heighten the plasticity. Each time, an appealing new optical interplay emerges. For her works, the painter draws inspiration from various influences. Particularly close to her heart are the impressions she gains in engaging with the forces of nature. Most important to her is color. »Color as the subject of painting is the constituent theme in the work of Ursula Jüngst.« For this reason, we have chosen the title »Farbe mein Gesang« (Color My Song) for the exhibition at Museum.Burg.Miltenberg.<br><br>Hermann Neubert<br><br> <br><br>Farbe mein Gesang<br><br>Excerpts from conversations between Ursula Jüngst and Bert Schlichtenmaier<br><br>BS Characteristic of Ursula Jüngst’s painting is the will to create the image. A multidimensional radiance surprises the viewer’s gaze and makes one forget time and place. Every color and every brushstroke is subjected to thorough scrutiny. Since the presentation of the last publication »Farbe meine Sprache«, her painting has intensified further. Concentrated energy discharges in vital brush placements and reveals a charged fullness of sensation that allows associations close to the world. Colors are used in impasto and dynamically, vibrating or resting tenderly. They mix and interpenetrate without surrendering their clarity and transparency. Bold color forms, inexplicable depths of space and pulsating placements refine the breathing color composition. On the one hand, the painting draws from the force field of cultures while avoiding any overlaying of symbolic strata; on the other hand, the brush—like a magic wand—shapes chords of color, structures and traces of movement that allow the viewer to take part in what has been experienced and call previous certainties into question.<br>UJ What is important for me is not merely to capture my own sensations in a kind of abstract expressionism, but to place every stroke in a controlled manner or to rework it if it is formulated too thinly or unclearly and does not integrate into the overall effect. Nowhere is there an identical application of paint. My picture surface transforms into a space of color.<br>BS The beginning of her artistic activity was marked by web-like intertwined forms of color and shape delivered with a wild gesture of the brush, in which the organically figurative and the abstract still combined. Fierce contrasts govern the rectangle of the canvas. With great immediacy we encounter order and chaos, light and dark, brightness and nocturnal black, as well as violence and confidence. Although the work does not directly follow fixed laws, individual pictorial elements are nevertheless joined into a harmonious composition whose tense equilibrium is preserved amid all dynamically flowing movement and radiates an invigorating effect. Is painting meant to be perceived only sensually with the eyes? Can it also be grasped rationally?<br>UJ Of course, it can also be clarified through a sharpening of consciousness. Regardless of that, for me painting is a dynamic process. I am interested in transformation. Inside and outside belong together. My brushwork of color is also the rhythm of my life, my colors my inner song made visible. On the other hand, I want to understand my own keyboards, conduct them and see how I can juggle. It is like music within me—beautiful music, which I can, however, only shape in color. My will is for the colors truly to begin to sing.", "Literatur_tableGrid46snippet1": "On the Painting of Ursula Jüngst<br><br>In the past year, Ursula Jüngst seems to have crossed something like a threshold in painterly terms in her work. Perhaps the sunlight of her adopted home of Barcelona played a part in this, as most of her new paintings originated under Mediterranean skies. Her paintings are abstract; only here and there can figurative elements be discerned through title, choice of color and pictorial structure. Intuitively she brings her inner images and moods onto the canvas—a working process in which the painting becomes almost an equal counterpart for her, one with which she engages intellectually, emotionally and at the same time physically. The artist vividly compares her pictorial approach to the idea of a \"dance\"1 that she performs on the picture surface. The resulting \"all-over\" compositions then bear both the traces of her movement and at the same time show images of memory that are certainly also a reflection of her surroundings—the landscape and the sea around Barcelona. This is probably also one reason why something of painting \"after nature\" still adheres to the structural layout of her pictures, causing them to oscillate between figurative and non-figurative abstraction. Above all, they captivate through immense color contrasts.<br><br>Her new paintings appear clearer than earlier ones, in which she worked within the applied paint with a thinner brush in an almost Old Masterly manner. Almost impressionistically, she now places color next to color, structuring the works in both material and visual terms. In this way, the intrinsic light of the colors also emerges more clearly, even though earlier paintings such as \"Dornbusch\" or \"Sternengeburt\" already developed an almost heightened luminosity. Whereas the older works testified to a stronger painterly mastery in the double sense of the word, Ursula Jüngst now engages more freely and concretely with the subject of color. Energetically and swiftly, using a broad brush, she sets independent color values onto the canvas like musical chords and structures the picture surface into distinct areas of color. Working in impasto from light to dark, she does so in such a way that the colors mix only very subtly with those applied previously, allowing both to retain their lucidity without turning gray. Islands, stripes or wedges of color spread vibrantly across the canvas, at times clashing in complementary contrast or harmoniously approaching one another.<br><br>This becomes particularly clear in the painting \"Elia\" (p. 5) from 2009. An energy-charged wedge of color strives from below the center on the right, intensifying from bright luminous yellow to burning orange, into the upper third of the picture, which it almost completely occupies. To the right and left it is framed by cool, shadowy areas of blue and green that organically enclose the burning wedge with frayed extensions. Both color areas simultaneously strive toward and flee from one another, trying to hold their ground or penetrate each other.<br>Almost diametrically opposite in behavior, though structurally similar in layout, is the diptych \"Geburtstag\" (p. 16) and \"Fest\" (p. 17), both from 2009. Here, two excitedly shimmering color fields of yellow, red-orange and greenish strokes press against a deep blue wedge of color that begins at the upper right in \"Geburtstag\" and slopes downward to the left below the center of \"Fest\". The blue is virtually besieged and, despite the tense, dynamic form of the wedge, recedes reservedly into the background of the picture.<br>In the painting \"Orangenbaum\" (p. 11) from 2009 we also find a similar formation. Luminous, sharply advancing polygons press from the right edge of the picture into a vibrantly structured green-blue expanse that shifts toward blue-violet along the border where the orange flows in.<br><br>Contrasts and effects of light appear to be an essential concern of the artist, who lives in Nuremberg and Spain. In ever new pictorial inventions they are explored to their very limits. Her \"paintings emerge without a fixed concept\", rather through a \"dialogue with the painting\".2 That dialogue seems to be conducted so intensely that the picture surface begins to shimmer. As a result, the viewer is almost overwhelmed by the surging abundance of colored illumination. Perhaps the fullness of simultaneously resonating, overlapping pictorial contents or moods is also the trigger for this rush of color—an effect that today one tends to know from other media rather than from the medium of the panel painting, which is almost regarded as anachronistic. The multi-layered visibility of Ursula Jüngst’s works, which with every glance evoke new ways of seeing between viewer and canvas—intensified by the ambivalence between the haptic presence and the visual effect of the colors—appears both entertaining and persistent at once.<br><br>Although the artist seems to paint spontaneously from within herself, the titles and isolated, vaguely suggested pictorial motifs point to Romantic themes. That she does not deny painterly lines of tradition is obvious. Her more recent works, however, testify to a more considered engagement with them. Seascapes such as \"gestreicheltes Meer\" (p. 10), for instance, do show a section of felt expanse. Yet even the sheer size of the format is not enough to let the gaze wander solely across the canvas stretched over the frame; rather, it continually wants to go beyond it. It is less the shudder of the sublime that places her works in the Romantic tradition than the unbridgeable longing for the transgression of boundaries and expansion into the infinite. Precisely the new works are able to illustrate this ambivalent desire. Thus the material and haptic presence of the paint draws the viewer into almost tangible proximity to the canvas, while the overall effect and radiance of the picture almost seem to slip out of view as a result. When viewing the overall picture, in turn, the evoked dynamic of crossing boundaries toward the infinite is contrasted with the concentration on the sculptural brushstroke that one wishes to examine in detail. By clearly revealing the insurmountability of this dichotomy, many of her new pictorial inventions detach themselves from the lived-out fascination of \"opening the two-dimensional surface into a three-dimensional, emotional depth of space\"3. They now seem to reflect this paradox in a gesturally rational way as well.<br><br>Sören Schmeling<br><br><br>1 Ursula Jüngst in conversation with the author<br>2 Ursula Jüngst in: Ursula Jüngst. Sternengeburt - Malerei. Exhibition catalogue. Nuremberg 2008, p. 10<br>3 Ibid., p. 11", "Literatur_tableGrid53snippet1": "Malerei und Zeichnungen<br><br>\"The visible quality is called color,\" writes the philosopher and theologian Johann Amos Comenius (1592–1670) in his theory of color, and continues: \"Color is light caught in various ways upon the surface of bodies and mixed with the opposing darkness, such as white, black, green, etc.\"<br>Yet what actually makes color so powerful in its effect, so vividly experienced and meaningful? This fundamental question certainly deserves many answers, primarily from art history, psychology, sociology and color technology. Essential answers to this question also come from art itself, from artists and their practice, and in particular from painting and practical artistic research into color.<br>Color and the effect of color are more than the flat application of paint, the movement of color waves or optical effects of light. Above all, color is a central agent in the mental process of seeing and cognition, and in this respect it forms a foundation for our understanding of the world and of reality.<br>As a Bauhaus teacher, Paul Klee pointed in his theory of color to the \"activity\" of color. Accordingly, colors are active media in a process of communication; they are universal and irreplaceable.<br><br><br><br>Peter Funken", "Literatur_tableGrid57snippet1": "blick-hindurch-blick<br><br>\"blick-hindurch-blick\" (gaze-through-gaze)... the three words in the title of our exhibition can enter into various combinations. If one reads the first \"blick\" as an imperative, then together with the following \"hindurch\" an appeal, an invitation emerges: \"Look through!\" If one begins in the middle and attaches the last word, the result is \"Hindurchblick\" (a gaze or view right through). Whoever wishes may take \"hindurch\" (through) as the center, flanked on either side by a double \"blick\" (gaze).<br><br>The enigmatic title points to an encounter between art and church as cultivated for years in the series \"Art in the Choir\" at the Open Church of St. Klara. Art and religion are siblings, independent and yet reliant upon one another. The art of painting as practiced by Ursula Jüngst moves as if on a balance beam: colors dance and glow while depth and expanse flash forth at the same time. A space opens up that goes beyond tangible form—at least for eyes that are able to look and to \"see through\".<br><br>Christian faith is likewise a living suspension between the \"visible\" and the \"invisible\". For the Rabbi from Nazareth, the eye was \"the light of the body\". The world lay before him like a living parable for the unfathomable God. Behind and within everything he saw his Father at work. Looking through to the ground of reality illuminates the eyes of the believer today as well. In all of this, God is and remains a mystery, exalted above all images. Faith is a luminous darkness.<br>Let the paintings and installations by Ursula Jüngst speak to you within and before a space of faith: Job on a blue pedestal—the blue portal through which one cannot enter, yet which can awaken an inner space—the blue portraits next to the relief of Caritas Pirckheimer in the courtyard—finally the central painting above the high altar, hanging like a curtain before the Holy of Holies—the narrow upright painting in the choir and its horizontal counterpart beneath the crucifixion group.<br><br>Both art and faith are concerned with the added value of seeing. If you have been enticed a little closer to yourself and a little further beyond yourself, then our exhibition has fulfilled its purpose.<br><br><br>Karl Kern SJ,<br>Director of the Open Church of St. Klara<br>", "Literatur_tableGrid61snippet1": "Vulkangeflüster<br><br>.... through walls of thorns thick as days, in lands of mist, beneath stars that no one had ever seen, surrounded by sudden, hissing, swirling, glowing poison-yellow-sweeping, howling-roaring, throat-parching, skin-scorching sandstorms, in vast, dead, abandoned, vanished, forgotten, sad, desolately decaying, sinking, crumbling ruins, between decaying, sinking, flame-flickering mountains of fire, racing, lightning-fast, rolling, surging, raging down into the valley, spraying embers, spraying blood, spraying floods, streams of lava threatening ruin, incineration and destruction, and unfathomable, motionless, Stygian-dark crater lakes fed by leaping geysers and ringed by walls of basalt, through mad, tangled, creased and cracked, split and splintered, uncannily fissured, breakneck-cleft glacier zigzag labyrinths spanned by treacherous, deceptive, deluding bridges of snow arches, wild caves and desolate rock, across night-black, gaping, yawning, plunging, bottomless chasms and abysses breathing pestilence and seething with vapor and steam, along bleak, pale, bare, rugged, cliff-walled, midnight-dark, maelstrom-rimmed, surf-roaring, auk-screeching, crag-needle-bristling, eerie shores strewn with human bones, on all seas, on all floodwaters, on all oceans I searched for... COLOR DREAM OF COLOR COLOR DREAM DREAM ... something tears apart, has already broken off, has formed anew, world-lizards intervene, lilac light from somewhere. Pink and orange wink at me, cyan smiles, indigo makes me stumble, I fall into violet. Along ochre and yellow I try to hold on to cloud-creatures ... I LOOK! I SEE! ... The attackers transported rocket launchers on donkey carts. The carts served as launch pads. Eight projectiles hit. .... Mind game?... Waking dream?... Recollection?... DREAMS ARE REALITY! The canvas vibrates gently at the touch of the brush. A pull. Nothing is rigid. Everything is in motion. Seems about to burst. A leap from the greatest height. I fall. The brush leaves its traces behind. One color demands the next. Layer upon layer of color condenses. Macrocosm and microcosm dance with one another... <br><br><br>(Excerpt from the performance: \"Daydreams – Nightdreams\" using texts by A. Holz, Ch. Morgenstern, J. Eichendorff, G. Belli, E. Heller, U. Jüngst and others)", "Literatur_tableGrid71snippet1": "Dialogues<br><br><br>\"The painter of the future is a colorist such as has never yet existed.\"<br>When Vincent van Gogh wrote this to his brother Theo, it became clear to him that color would play an outstanding role in painting in the future. The development of art, especially after 1900, confirmed his vision.<br><br>For Ursula Jüngst, too, color is of truly vital significance. Her development toward this did not always proceed smoothly, especially since the conceptualists at the Nuremberg Academy of Fine Arts looked over her shoulder with rather little understanding. Yet through her studies in Barcelona—above all her perception of landscape and color under the influence of the southern light—she found her path. Her extended working stays in Barcelona are an important visual stimulus for her work.<br><br>While the expressive power of her paintings reveals influences of the Expressionists and Surrealists, she nevertheless succeeds in arriving at entirely new, unconventional pictorial solutions. The multi-layered nature of her painterly oeuvre, shaped by several strands of development, therefore precludes any one-dimensional classification.<br>First there are the paintings that literally explode with color. The viewer’s eye is constantly challenged to discover something new.<br>Dynamism and immediacy become evident in the restless, thick brushwork, often applied in multiple layers one over another; then again, the finest internal structures open up on only partially superimposed layers of paint—monochrome areas of color in between seem to stabilize the pictorial structure as poles of calm.<br><br>Perceiving her paintings goes hand in hand with associating one’s own images and experiences. Her pictorial forms are not figurative, yet at times they recall biomorphic shapes, cosmic formations, or phenomena of nature.<br><br>Ursula Jüngst’s process of artistic invention does not arise directly from reproducing what has been perceived, but rather from calling up inner, as it were sedimented images, which she develops on the canvas by means of a kind of \"écriture automatique\", a method already used by the Surrealists.<br>Her pictorial solutions, however, are by no means derivative. What is new is the freshness and originality of her colors and creations of form, which like a musical composition produce a vibrant movement of the most varied sounds and rhythms.<br>The works created between 1996 and 1999 at times recall the primal colorfulness of folk tapestries or the exuberant sensuous richness of Oriental bazaars.<br><br>From the open, multi-layered structure of forms, the viewer can associate experiences and myths from the unconscious—a process that Ursula Jüngst describes as the \"archaeology of the unconscious\".<br><br>Her works open themselves to the viewer beyond rational and analytical explanations, \"through our capacity for vivid remembrance of the uninhibited intensity of imagination with which we were gifted as children. In our childhood we possessed a magical consciousness, and it is this magical part of our consciousness that art ultimately addresses within us.\"<br><br>Especially in an age of media image overload, in which there is less focus on an intensive engagement with the individual picture, the works of Ursula Jüngst represent a challenge. Through perceiving her paintings, from which dialogues emerge, it becomes possible to bring buried experiences back to life and to awaken dimensions of the \"inner child\".<br><br>The artist’s excursions through inner worlds of experience are documented by her unusual picture titles as well as her own poetic texts on the artistic process of creation. Thus she wrote of the painting \"Patke Patke\" (2002): \"... A small section of a meadow. At first there is only green, then I discover vibrant life. Animals, little creatures, faces, eyes, different colors, light and shadow. The canvas vibrates gently at the touch of the brush. A pull. Nothing is rigid ...\".<br><br>Alongside the works that display a multitude of form and color structures, there are paintings executed predominantly in monochrome and with vigorous brushstrokes. The works \"Busco\" (1997) and \"Ali\" (1997) already mark this other line of development; the composition seems to unfold from the center of the picture.<br>More recent works such as \"Pana Napa\" (2002) and \"Patke Patke\" (2002) are laid out with greater painterly delicacy. The flickering linear formations pushing outward recall processes of growth and constant change.<br>\"Everything is in motion. Seems about to burst ... Paths, mountains, valleys, landscapes grow. Layer upon layer of color, the picture condenses ever more into a complex world in which macrocosm and microcosm weave together as if into one.\"<br><br>The cycle of paintings AZULEN, created in Spain in 1999, forms a distinct group of works. Instead of the lively expressive force of the paintings that recall dances of color, a more restrained pictorial effect dominates here. Evenly applied glazes of color allow spaces of color to emerge. The narrow vertical format of the works creates austerity and concentration.<br><br>The name AZULEN derives from the Spanish \"azul\" = blue. The word \"azulejos\" also comes to mind, denoting the wall tiles spread by the Moors in Spain and Portugal from the 14th century onward.<br>Although blue determines the chromatic chord of this series, here and there a yellow, a red, or a white flashes forth, heightening the effect of the fundamental tone even further. In almost all of the works, a vertical monochrome stripe of color is laid out, running through the painting either as a narrow bright beam of light or as a widening stream of blue.<br><br><br>The color blue essentially determines the special potency of the AZULEN. In its \"sensuous-moral\" effect, Goethe described it as \"fleeting\"; for Kandinsky it was a \"color of deepening\" that calls human beings into the infinite. Blue may address realms of the cosmic. The calm, even application of paint in the AZULEN underscores a perception of the image that can also be interpreted as a turning toward one’s own interior, as a search for the \"ideal of unity\" beyond earthly dimensions.<br><br>The Essen exhibition project at the Galerie im Schloß Borbeck and at the Marktkirche Essen thus seeks to point to the various aspects of Ursula Jüngst’s oeuvre. While the gallery shows a cross-section of the works overflowing with color as well as a selection of drawings, an installation from the AZULEN series is presented in the altar area of the Marktkirche.<br><br>The two exhibition venues establish an interesting connecting line not only artistically, but also historically. The founder of the former \"Chapel of St. Gertrude\" in the 11th century was Theophanu, abbess of the important Essen women’s collegiate foundation. From the 14th century onward, as the town increasingly established itself as a civic community with town rights and self-government—for which the Marktkirche also stands symbolically—the residence of the princess-abbesses was moved from the core of the small farming town to Schloß Borbeck.<br><br>The installation of the meditatively resonant steles also creates an interesting dialogue between architecture and art. It thus points to the plans for the upcoming redesign of the church interior, which in the design is envisioned as a blue glass cube extending in the nave from east to west into the exterior space.<br><br>Above all, however, the link between the two presentation venues lies in the work itself, which despite its diversity has a common denominator: not only the artistic process of creation, but also the suggestive power of Ursula Jüngst’s paintings raises existential questions: \"For me, to paint means ... to reflect on the world, to bring into consciousness, to remember creation anew again and again ...\" and \"... to paint is also to be on the way, to expose myself, to search. Nothing is rigid, I have no final answers.\"<br><br><br>Inge Ludescher, 2003<br><br>", "Flyer_snippet36": "<a href='Flyer/UJ_Flyer_2026.pdf' target=_self>View and download PDF</a>", "Flyer_snippet34": "<a href='Flyer/UJ_Flyer_2025.pdf' target=_self>View and download PDF</a>", "Flyer_snippet29": "<a href='Flyer/UJ_Flyer_2024.pdf' target=_self>View and download PDF</a>", "Flyer_snippet27": "<a href='Flyer/UJ_Flyer_Paderborn_2024.pdf' target=_self>View and download PDF</a>", "Flyer_snippet25": "<a href='Flyer/UJ_Flyer_2022.pdf' target=_self>View and download PDF</a>", "Flyer_snippet20": "Studio photo shoot 2017", "Flyer_snippet22": "<a href='Flyer/UJ_A_S_2017.pdf' target=_self>View and download PDF</a>", "Flyer_snippet13": "<a href='Flyer/UJ_Flyer_2016.pdf' target=_self>View and download PDF</a>", "Flyer_snippet15": "<a href='Flyer/UJ_Flyer_2015.pdf' target=_self>View and download PDF</a>", "Flyer_snippet18": "<a href='Flyer/UJ_Flyer_2014.pdf' target=_self>View and download PDF</a>", "Literatur_snippet99": "<a href='http://www.ursula-juengst.com/Literatur/UJ_Ariadnefaeden_2023.pdf' target=_self>Look inside the book<br></a>", "Literatur_snippet95": "<a href='http://www.ursula-juengst.com/Flyer/UJ_Heilsbronn_2021.pdf' target=_self>View and download PDF</a>"}}};

    function getStoredLanguage() {
        try {
            var stored = localStorage.getItem("lang");
            if (stored) return stored;
        } catch (e) {}
        if (window.name && window.name.indexOf("uj_lang:") === 0) {
            return window.name.split(":")[1] || "de";
        }
        return "de";
    }

    function setStoredLanguage(lang) {
        try {
            localStorage.setItem("lang", lang);
        } catch (e) {}
        try {
            window.name = "uj_lang:" + lang;
        } catch (e) {}
    }

    function applyLanguageLabels(lang, labels) {
        restoreTranslatedContent();
        applyDataI18nTranslations(labels);
        applyDirectContentTranslations(labels);
        applyAutomaticContentTranslations(lang, labels);
        applyPageTitle(labels);
        document.documentElement.setAttribute("lang", lang);
        setStoredLanguage(lang);
        updateLanguageSelector(lang);
    }

    function loadLanguage(lang) {
        return $.getJSON("Textressourcen/" + lang + ".json?v=20261110c")
            .done(function (labels) {
                applyLanguageLabels(lang, labels);
            })
            .fail(function () {
                if (FALLBACK_LABELS && FALLBACK_LABELS[lang]) {
                    applyLanguageLabels(lang, FALLBACK_LABELS[lang]);
                } else {
                    console.error("Sprachdatei konnte nicht geladen werden:", lang);
                }
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

        loadLanguage(getStoredLanguage());

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
