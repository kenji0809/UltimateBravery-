; (function () {



    angular.module('ultimateBravery')
        .component('uBComponent', {
            templateUrl: 'ultimatebraveryapp/templates/homepage.html',
            controller: UBController


        })



    UBController.$inject = ['$state', 'LeagueService', 'SummonerService']


    function UBController($state, LeagueService, SummonerService) {
        let ubc = this
        ubc.$onInit = function () {
            if ($('iframe').length > 0) {
                return $('iframe').show();
            }


            $('#ytpPlayer').append(`<div id="ppp" class="player"></div>`).after(function () {
                var videos = [
                    { videoURL: 'https://youtu.be/lu0fUb0PGh4', containment: 'body', autoPlay: true, showYTLogo: false, mute: true, startAt: 0, opacity: .6, showControls: false, optimizeDisplay: true, realfullscreen: true, quality: 'hd1080', addRaster: false, gaTrack: false }
                ];
                ubc.ytpElem = $("#ppp").YTPlaylist(videos, true, function (a) {

                });
            })
        }

        ubc.$onDestroy = function () {
            $('iframe').hide();
        }

        ubc.showSummonerProfile = function (summoner) {

            // $state.go('landingpage', {summoner: summoner})

             return $state.go('landingpage', { summoner: summoner })


        }






    }



} ());
