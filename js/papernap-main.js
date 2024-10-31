/**
 * Created by prashantsingh on 08/04/20.
 */
var $ = jQuery;
var PAPERNAPURL = 'https://www.papernap.com/';
var APIAIRSHOPIFYURLREV = PAPERNAPURL+'api/';
var hostname = window.location.hostname;
var path = window.location.pathname;
var categoriesrev = '';
var prodIDrev = '';
setTimeout(function () {
    jQuery(document).ready(function () {
    });
}, 500);

function Paperrevloadmore(type, keywordId, categoryId, questionID) {
    var opt = $('#rev-opt').val();
    if (opt == 0) {
        $('.rev-hide').removeClass('hidden');
        $('#rev-opt').val(1);
    } else {
        PaperhideElement('.rev-hide');
        $('#rev-opt').val(0);
        Paperreadmore(type, keywordId, categoryId, questionID)
    }
}

function Paperreadmore(type, keyword, category, question) {
    var maxLength = 200;
    $(".rev-answers").each(function () {
        var myHtml = $(this).html();
        var myStr = $(this).text();
        if ($.trim(myStr).length > maxLength) {
            var newStr = '<p class="airrev-trim-content">' + myStr.substring(0, maxLength) + '</p>';
            var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
            $(this).empty().html(newStr);
            $(this).append(' <a href="javascript:void(0);" class="rev-read-more" onclick="Papertrackcontent(' + type + ',' + keyword + ',' + category + ',' + question + ')">read more...</a>');
            $(this).append('<span class="rev-more-text hidden">' + myHtml + '</span>');
        }
    });
    $(".rev-read-more").click(function () {
        $(this).siblings(".airrev-trim-content").remove();
        $(this).siblings(".rev-more-text").contents().unwrap();
        $(this).remove();
        var visitorID = PapergetCookie('wpvisitorID');
        if (!visitorID) {
            visitorID = Papermakeid(8);
        }
        PapersetCookie('wpvisitorID', visitorID, '30');
        $('#rev-opt').val(1);
    });
}

function PapergetStars(starVal) {
    var stars = '';
    if (starVal == 1) {
        stars = '<span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>';
    } else if (starVal == 2) {
        stars = '<span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>';
    } else if (starVal == 3) {
        stars = '<span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>';
    } else if (starVal == 4) {
        stars = '<span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star"></span>';
    } else if (starVal == 5) {
        stars = '<span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>' +
            ' <span class="fa fa-star checked"></span>';
    } else {
        stars = '<span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>' +
            ' <span class="fa fa-star"></span>';
    }
    return stars;
}

function PapershowElement(element) {
    // $(element).removeClass('hidden');
    $(element).removeClass('d-none');
}

function PaperhideElement(element) {
    // $(element).addClass('hidden');
    $(element).addClass('d-none');
}

function Papermakeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function PapersetCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
}

function PapergetCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}


function PapergetKeywords(type) {
    PapershowLoader();
    var visitorID = PapergetCookie('wpvisitorID');
    if (!visitorID) {
        visitorID = Papermakeid(8);
    }
    PapersetCookie('wpvisitorID', visitorID, '30');
    var formData = new FormData();
    formData.append('shop', $.trim(hostname));
    formData.append('productID', prodIDrev);
    formData.append('type', type);
    formData.append('categories', categoriesrev);
    formData.append('visitorID', visitorID);
    formData.append('product_content', $('#papernap-content').val());
    $.ajax({
        type: 'POST',
        url: APIAIRSHOPIFYURLREV + 'getKeywords',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (response) {
            if (response.code == 200) {
                $('#typeOptions .color_light_green').removeClass('active');
                if (type == 1) {
                    $('#mendata').addClass('active');
                } else if (type == 2) {
                    $('#womendata').addClass('active');
                } else if (type == 3) {
                    $('#boydata').addClass('active');
                } else if (type == 4) {
                    $('#girldata').addClass('active');
                }
                $('#revkeywords').empty();
                if (response.keywordsArr && response.keywordsArr.length > 0) {
                    $.each(response.keywordsArr, function (ind, val) {
                        var keywordBlock = '<li id="keyword' + ind + '" class="nav-item item w-auto d-inline-block"> ' +
                            '<a id="keywordAnchor' + val.id + '" class=" color_pink btn nav-link ' + (ind == 0 ? 'active' : '') + '" data-toggle="custom-tab" href="javascript:void(0)" onclick="PapergetQuestions(\'' + val.id + '\',\'' + prodIDrev + '\',\'category\',\'' + type + '\')"> ' + (val.keyword_alias && val.keyword_alias != '' ? val.keyword_alias : val.keyword) + '</a> </li>';
                        $('#revkeywords').append(keywordBlock);
                    });
                    setTimeout(function () {
                        $('#keyword0 a').trigger('click');
                    }, 1000);
                } else {
                    PaperhideLoader();
                }
            } else {
                PaperhideLoader();
            }
        }
    });
}

function PapergetQuestions(keywordId, productId, categoryId, type) {
    var visitorID = PapergetCookie('wpvisitorID');
    if (!visitorID) {
        visitorID = Papermakeid(8);
    }
    PapersetCookie('wpvisitorID', visitorID, '30');
    var formData = new FormData();
    formData.append('shop', $.trim(hostname));
    formData.append('type', type);
    formData.append('categoryId', categoryId);
    formData.append('keywordId', keywordId);
    formData.append('visitorID', visitorID);
    formData.append('product_content', $('#papernap-content').val());
    $.ajax({
        type: 'POST',
        url: APIAIRSHOPIFYURLREV + 'getQuestions',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (response) {
            if (response.code == 200) {
                $('#revkeywords .color_pink').removeClass('active');
                $('#keywordAnchor' + keywordId).addClass('active');
                $('#revquestions').remove();
                $('.revQuesSec').append('<ul class="nav question_slider" id="revquestions" role="custom-tablist"></ul>');
                if (response.quesArr) {
                    $.each(response.quesArr, function (ind, val) {
                        var questionBlock = '<li id="question' + ind + '" class="nav-item item w-auto d-inline-block"> ' +
                            '<a id="questionAnchor' + val.id + '" class="color_light_green btn nav-link ' + (ind == 0 ? 'active' : '') + '" href="javascript:void(0)" onclick="PapergetAnswers(\'' + val.id + '\',\'' + productId + '\',\'' + val.category_id + '\',\'' + type + '\',\'' + keywordId + '\')"> ' + val.question + '</a> </li>';
                        $('#revquestions').append(questionBlock);
                    });
                    setTimeout(function () {
                        $('#question0 a').trigger('click');
                        $('.question_slider').slick({
                            dots: false,
                            infinite: false,
                            speed: 300,
                            slidesToShow: 1,
                            centerMode: false,
                            variableWidth: true,
                            arrows: true,
                            prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
                            nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',

                        });
                    }, 1000);
                } else {
                    PaperhideLoader();
                }
            } else {
                PaperhideLoader();
            }
        }
    });
}

function PapergetAnswers(questionID, productId, categoryId, type, keywordId) {
    var visitorID = PapergetCookie('wpvisitorID');
    if (!visitorID) {
        visitorID = Papermakeid(8);
    }
    PapersetCookie('wpvisitorID', visitorID, '30');
    var formData = new FormData();
    formData.append('shop', $.trim(hostname));
    formData.append('type', type);
    formData.append('categoryId', categoryId);
    formData.append('keywordId', keywordId);
    formData.append('questionID', questionID);
    formData.append('visitorID', visitorID);
    $.ajax({
        type: 'POST',
        url: APIAIRSHOPIFYURLREV + 'getAnswers',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (response) {
            $('#revquestions .color_light_green').removeClass('active');
            $('#questionAnchor' + questionID).addClass('active');
            if (response.code == 200) {
                $('#tab1_subtab1_grand1').empty();
                if (response.answerArr && response.answerArr.length > 0) {
                    $.each(response.answerArr, function (ind, val) {
                        var AnswerBlock = '<div class="row dashboard_com_text ' + (ind > 1 ? 'hidden rev-hide' : '') + ' mb-5"> <div class="col-md-2 dashboard_com_img"> <a href="' + (val.profile_link && val.profile_link != '' ? PAPERNAPURL + 'profile/' + val.profile_link : 'javascript:void(0)') + '" ' + (val.profile_link && val.profile_link != '' ? 'target="_blank"' : '') + '><img width="50" class="rounded-circle" src="' + (val.profile_image != '' ? val.profile_image : 'https://www.airsuggest.com/assets/shopify-rev/images/asset-2.png') + '"></a> </div> ' +
                            '<div class="col-md-8 p-3">' +
                            '<h3>' + val.name + '</h3>' +
                            (val.heading && val.heading != '' ? '<h4>' + val.heading + '</h4>' : '') +
                            '<div class="review-icon d-inline"> ' +
                            PapergetStars((val.star ? val.star : 0)) + '</div>' +
                            '<div class="rev-answers mt-2">' + val.answer + '</div> ' +
                            ' </div> </div> ';
                        $('#tab1_subtab1_grand1').append(AnswerBlock);
                    });
                    setTimeout(function () {
                        $('#tab1_subtab1_grand1').append('<input type="hidden" class="hidden" id="rev-opt" value="0" />');
                        $('#tab1_subtab1_grand1').append('<div class="hr_border"> <div class="dashboard_com_btn"><a href="javascript:void(0)" onclick="Paperrevloadmore(' + type + ',' + keywordId + ',' + categoryId + ',' + questionID + ')" class="load_comment rev-load-more"><i class="fa fa-angle-down"></i></a></div> </div>');
                        PaperhideLoader();
                    }, 500);
                    Paperreadmore(type, keywordId, categoryId, questionID);
                } else {
                    PaperhideLoader();
                }
            } else {
                PaperhideLoader();
            }
        }
    });
}

function Papertrackcontent(type, keyword, category, question) {
    console.log(type, keyword, category, question);
    var visitorID = PapergetCookie('wpvisitorID');
    if (!visitorID) {
        visitorID = Papermakeid(8);
    }
    PapersetCookie('wpvisitorID', visitorID, '30');
    var formData = new FormData();
    formData.append('shop', $.trim(hostname));
    formData.append('type', type);
    formData.append('categoryId', category);
    formData.append('keywordId', keyword);
    formData.append('questionID', question);
    formData.append('visitorID', visitorID);
    $.ajax({
        type: 'POST',
        url: APIAIRSHOPIFYURLREV + 'trackcontent',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (response) {
        }
    });
}

function papernapShowContent() {
    prodIDrev = $.trim($("#airrev-suggest-sp-app").attr('data-id'));
    categoriesrev = $('#papernap-category').val();
    var formData = new FormData();
    formData.append('shop', $.trim(hostname));
    formData.append('productID', prodIDrev);
    formData.append('product_content', $('#papernap-content').val());
    formData.append('security', $.trim($('#papernap-nonce').val()));
    $.ajax({
        type: 'POST',
        url: APIAIRSHOPIFYURLREV + 'getReviews',
        data: formData,
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        beforeSend: function () {
        },
        success: function (response) {
            if (response.code == 200 && response.enable_admin == 1) {
                var customerType = (response.women == 1 ? 2 : response.men);
                $("#airrev-suggest-sp-app").empty();
                var basicStructure = '<div id="airrevappcontainer" class="dashboard container"> ' +
                    '<div class="row"> ' +
                    '<div class="col-lg-4 mb-2">' +
                    '<a id="papernapCat" href="javascript:void(0)" class="color_light_green btn nav-link"></a> </div>' +
                    '<div class="col-md-12"> ' +
                    '<div class="row tab-parent d-none">' +
                    ' <div class="col-md-12">' +
                    ' <ul class="nav nav-tab first-tab dashboard_slider" id="typeOptions" role="custom-tablist"> ' +
                    '<li class="nav-item"> <a id="mendata" class=" color_light_green btn nav-link active" href="javascript:void(0)" onclick="PapergetKeywords(1)"> Men</a> </li>' +
                    ' <li class="nav-item"> <a id="womendata" class=" color_light_green btn nav-link" href="javascript:void(0)" onclick="PapergetKeywords(2)"> Women</a> </li>' +
                    ' <li class="nav-item"> <a id="boydata" class=" color_light_green btn nav-link" href="javascript:void(0)" onclick="PapergetKeywords(3)"> Boy</a> </li> ' +
                    '<li class="nav-item"> <a id="girldata" class=" color_light_green btn nav-link" href="javascript:void(0)" onclick="PapergetKeywords(4)"> Girl</a> </li> ' +
                    '<li class="nav-item"> <a id="girldata" class=" color_light_green btn nav-link" href="javascript:void(0)" onclick="PapergetKeywords(1)"> All</a> </li> ' +
                    '</ul> ' +
                    '</div> </div> ' +
                    '<div class="tab-content"> ' +
                    '' +
                    '<div id="tab1" class="tab-pane active">' +
                    '<div class="row tab-parent"> <div class="col-md-12"> ' +
                    '<ul class="nav nav-tab dashboard_slider" id="revkeywords" role="custom-tablist"> ' +
                    '</ul> </div> </div> <!-- Tab panes --> <div class="tab-content mt-3"> ' +
                    '' +
                    '<div id="tab1_subtab1" class="tab-pane active">' +
                    '<div class="row tab-parent"> <div class="revQuesSec col-md-12"> ' +
                    '<ul class="nav dashboard_slider" id="revquestions" role="custom-tablist"> ' +
                    ' </ul> </div> </div> <div class="tab-content"> ' +
                    '' +
                    '<div id="tab1_subtab1_grand1" class="tab-pane active"> <br> ' +
                    ' <div class="hr_border"> <div class="dashboard_com_btn"><a href="javascript:" class="load_comment rev-load-more"><i class="fa fa-angle-down"></i></a></div> </div> </div> ' +
                    '<div id="bloggeradd" class="col-lg-12 pt-2"><a href="https://www.papernap.com" target="_blank">Powered By - Papernap</a> </div>' +
                    ' </div> </div> ' +
                    ' </div> </div> </div> </div> </div></div>';
                if ($('#airrevappcontainer').length == 0) {
                    $("#airrev-suggest-sp-app").append(basicStructure);
                }
                /*if ($("#paperloader").length == 0) {
                    $("#airrev-suggest-sp-app").prepend('<div id="paperloader" class="hidden"></div>');
                    PapershowLoader();
                }*/

                if ($("#paperprogressloader").length == 0) {
                    // $("#airrev-suggest-sp-app").prepend('<div id="paperloader" class="d-none"></div>');
                    $("#airrev-suggest-sp-app").prepend('<div id="paperprogressloader"><p class="text-center">Loading Reviews...</p><div class="Paperprogress m-auto">' +
                        '<div class="Paperprogress-bar"></div>' +
                        '</div></div>');
                    PapershowLoader();
                }
                if (customerType > 0) {
                    formData.append('type', customerType);
                    formData.append('product_content', $('#papernap-content').val());
                    formData.append('security', $.trim($('#papernap-nonce').val()));
                    $.ajax({
                        type: 'POST',
                        url: APIAIRSHOPIFYURLREV + 'getKeywords',
                        data: formData,
                        dataType: 'json',
                        contentType: false,
                        cache: false,
                        processData: false,
                        beforeSend: function () {
                        },
                        success: function (response) {
                            if (response.dataFound == 0) {
                                if ($('#airrev404').length == 0) {
                                    $('#typeOptions').empty();
                                    $('#tab1').empty();
                                    PaperhideLoader();
                                    PaperhideElement('#airrev-suggest-sp-app');
                                    PaperhideElement('#papernapPowerdby');
                                    // $('#airrevappcontainer').prepend('<h4 class="text-capitalize mb-4" id="airrev404">For this product category, we do not have any blogs.</h4>');
                                }
                            } else if (response.dataFound == 1 && response.code == 200) {
                                $('#typeOptions .color_light_green').removeClass('active');
                                $('#mendata').addClass('active');

                                $('#revkeywords').empty();
                                var catID = response.categoryID;
                                var keywrdID = '';
                                $('#papernapCat').html('Reviews for - <b>'+response.category+'</b>');
                                $.each(response.keywordsArr, function (ind, val) {
                                    if (ind == 0) {
                                        keywrdID = val.id;
                                    }
                                    var keywordBlock = '<li id="keyword' + ind + '" class="nav-item"> ' +
                                        '<a id="keywordAnchor' + val.id + '" class=" color_pink btn nav-link ' + (ind == 0 ? 'active' : '') + '" data-toggle="custom-tab" href="javascript:void(0)" onclick="PapergetQuestions(\'' + val.id + '\',\'' + prodIDrev + '\',\'category\',\''+customerType+'\')"> ' + (val.keyword_alias && val.keyword_alias != '' ? val.keyword_alias : val.keyword) + '</a> </li>';
                                    if ($('#keyword' + ind).length == 0) {
                                        $('#revkeywords').append(keywordBlock);
                                    }
                                });
                                setTimeout(function () {
                                    formData.append('keywordId', keywrdID);
                                    formData.append('security', $.trim($('#papernap-nonce').val()));
                                    $.ajax({
                                        type: 'POST',
                                        url: APIAIRSHOPIFYURLREV + 'getQuestions',
                                        data: formData,
                                        dataType: 'json',
                                        contentType: false,
                                        cache: false,
                                        processData: false,
                                        beforeSend: function () {
                                        },
                                        success: function (response) {
                                            if (response.code == 200) {
                                                $('#revkeywords .color_pink').removeClass('active');
                                                $('#keywordAnchor' + keywrdID).addClass('active');
                                                $('#revquestions').empty();
                                                var quesID = '';
                                                if (response.quesArr) {
                                                    $.each(response.quesArr, function (ind, val) {
                                                        if (ind == 0) {
                                                            quesID = val.id;
                                                            catID = val.category_id;
                                                        }
                                                        var questionBlock = '<li id="question' + ind + '" class="nav-item"> ' +
                                                            '<a id="questionAnchor' + val.id + '" class="color_light_green btn nav-link ' + (ind == 0 ? 'active' : '') + '" href="javascript:void(0)" onclick="PapergetAnswers(\'' + val.id + '\',\'' + prodIDrev + '\',\'' + val.category_id + '\',\''+customerType+'\',\'' + keywrdID + '\')"> ' + val.question + '</a> </li>';
                                                        $('#revquestions').append(questionBlock);
                                                        if ($('#question' + ind).length == 0) {
                                                            $('#revquestions').append(questionBlock);
                                                        }
                                                    });
                                                    setTimeout(function () {
                                                        formData.append('categoryId', catID);
                                                        formData.append('questionID', quesID);
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: APIAIRSHOPIFYURLREV + 'getAnswers',
                                                            data: formData,
                                                            dataType: 'json',
                                                            contentType: false,
                                                            cache: false,
                                                            processData: false,
                                                            beforeSend: function () {
                                                            },
                                                            success: function (response) {
                                                                $('#revquestions .color_light_green').removeClass('active');
                                                                $('#questionAnchor' + quesID).addClass('active');
                                                                if (response.code == 200) {
                                                                    $('#tab1_subtab1_grand1').empty();
                                                                    $.each(response.answerArr, function (ind, val) {
                                                                        var AnswerBlock = '<div class="row dashboard_com_text ' + (ind > 1 ? 'hidden rev-hide' : '') + ' mb-2"> <div class="col-md-2 dashboard_com_img"> <a href="' + (val.profile_link && val.profile_link != '' ? PAPERNAPURL + 'profile/' + val.profile_link : 'javascript:void(0)') + '" ' + (val.profile_link && val.profile_link != '' ? 'target="_blank"' : '') + '><img width="50" class="rounded-circle" src="' + (val.profile_image != '' ? val.profile_image : 'https://www.airsuggest.com/assets/shopify-rev/images/asset-2.png') + '"></a> </div> ' +
                                                                            '<div class="col-md-8 p-3">' +
                                                                            '<h3>' + val.name + '</h3>' +
                                                                            (val.heading && val.heading != '' ? '<h4>' + val.heading + '</h4>' : '') +
                                                                            ' <div class="review-icon d-inline"> ' +
                                                                            PapergetStars((val.star ? val.star : 0)) + '</div><div class="rev-answers mt-2">' + val.answer + '</div>' +
                                                                            ' </div> </div> ';
                                                                        $('#tab1_subtab1_grand1').append(AnswerBlock);
                                                                    });
                                                                    setTimeout(function () {
                                                                        $('#tab1_subtab1_grand1').append('<input type="hidden" class="hidden" id="rev-opt" value="0" />');
                                                                        $('#tab1_subtab1_grand1').append('<div class="hr_border"> <div class="dashboard_com_btn"><a href="javascript:void(0)" onclick="Paperrevloadmore(1,' + keywrdID + ',' + catID + ',' + quesID + ')" class="load_comment rev-load-more"><i id="airrev-expand-col" class="fa fa-angle-down"></i></a></div> </div>');
                                                                    }, 500);
                                                                    Paperreadmore(1, keywrdID, catID, quesID);
                                                                }
                                                                PaperhideLoader();
                                                            }
                                                        });
                                                    }, 1000);
                                                } else {
                                                    PaperhideLoader();
                                                }
                                            }else{
                                                PaperhideLoader();
                                                PaperhideElement('#airrev-suggest-sp-app');
                                            }
                                        }
                                    });
                                }, 1000);
                            } else if (response.code == 202) {
                                PaperhideLoader();
                                PaperhideElement('#tab1 .row');
                                PaperhideElement('#tab1 .tab-content');
                            } else {
                                PaperhideLoader();
                            }
                        }
                    });
                } else {
                    PaperhideElement('#airrevappcontainer');
                    PaperhideLoader();
                }
                setTimeout(function () {
                    setTimeout(function () {
                        $('.dashboard_slider').slick({
                            dots: false,
                            infinite: false,
                            speed: 300,
                            slidesToShow: 1,
                            centerMode: false,
                            variableWidth: true,
                            arrows: true,
                            prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
                            nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',

                        });
                    }, 5000);
                }, 1000);

            }
        }
    });
}

function Papertrackorderdetails(orderid) {
    var visitorID = PapergetCookie('wpvisitorID');
    if (visitorID) {
        var formData = new FormData();
        formData.append('orderid', $('#papernap-order-id').val());
        formData.append('prodArr', $('#papernap-prod-det').val());
        formData.append('created_at', $('#papernap-order-created').val());
        formData.append('updated_at', $('#papernap-order-updated').val());
        formData.append('total_price', $('#papernap-order-price').val());
        formData.append('currency', $('#papernap-order-currency').val());
        formData.append('cancelled_at', $('#papernap-order-cancel').val());
        formData.append('financial_status', $('#papernap-order-status').val());
        formData.append('browser_ip', $('#papernap-order-ip').val());
        formData.append('email', $('#papernap-order-email').val());
        formData.append('paidDate', $('#papernap-order-paidDate').val());
        formData.append('visitorid', visitorID);
        formData.append('site_url', hostname);
        formData.append('security', $.trim($('#papernap-order-nonce').val()));
        $.ajax({
            type: 'POST',
            url: APIAIRSHOPIFYURLREV + 'trackOrderDetails',
            data: formData,
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function (response) {
                if (response.code == 200) {
                    Paperdelete_cookie('wpvisitorID');
                }
            }
        });
    }
}

function Paperdelete_cookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function PapershowLoader() {
    $('#airrev-suggest-sp-app').addClass('paperloader');
    PapershowElement('#paperprogressloader');
    $('#airrevappcontainer .row').css('visibility', 'hidden');
}

function PaperhideLoader() {
    setTimeout(function () {
        $('#airrev-suggest-sp-app').removeClass('paperloader');
        $('#airrevappcontainer .row').css('visibility', 'visible');
        PaperhideElement('#paperprogressloader');
    }, 1000);
}
