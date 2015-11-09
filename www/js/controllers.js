angular.module('starter.controllers', [])

    .run(function ($rootScope, $state, gvars, Auth, utils) {

        $rootScope.postdroid = gvars.postdroid;
        $rootScope.appUser = gvars.appUser;

        $rootScope.save_draft = function () {
            Auth.savePostdroid(function () {
                utils.showpop($rootScope,
                    'Draft Name',
                    '<input type="text" ng-model="data.txMsg">',
                    function (res) {
                        //console.log('res : ', res);
                        if (res) {
                            Auth.saveDraft(res, function () {
                                utils.alert('Success',
                                    'Draft was successfully saved. You can use this draft from the app or from postdroid.com website.');
                                $state.go('app.home.products');
                            }, function (err_msg) {
                                utils.alert(err_msg);
                            });
                        }
                    }
                );
            }, function (err_msg) {
                err_msg = err_msg ? err_msg : 'Unable to save your order. Please try again later.';
                utils.alert('Error', err_msg);
            });
        };

        $rootScope.show_preview = function () {
            var errors = Auth.validatePostdroid();
            if (errors.length > 0) {
                utils.alert('Error', errors);
                return;
            }
            $state.go('app.preview');
        };

        $rootScope.$on('$stateChangeStart', function (event, next, current) {

            /*if (next.name.indexOf('login') === -1 && next.name.indexOf('forget') === -1 &&
                next.name.indexOf('register') === -1 && next.name.indexOf('register1') === -1) {
                if (gvars.appUser.id < 1) {
                    event.preventDefault();
                    $state.go('login');
                    return;
                }
            }*/

        });

    })

    .controller('AuthCtrl', function ($scope, $ionicModal, $state, settings, Auth, utils, gvars) {

        $scope.loginData = Auth.getLoginData();
        $scope.regData = Auth.getRegData();
        $scope.countryList = Auth.getCountryList();

        $scope.doLogin = function () {

            if ($scope.loginData.username == null || $scope.loginData.password == null || $scope.loginData.username == '' || $scope.loginData.password == '') {
                utils.alert("Oopss...", "Please input user name and password");
                return;
            }

            Auth.Login(function (data) {
                //console.log("received: ", data);
                $state.go('main');
                return ;
                if (data.SUCCESS) {                    
                    $state.go('main');
                } else {
                    utils.alert("Oopss...", data.ERROR_MSG);
                }
            });

        };

        $scope.forgotPassword = function () {

            if ($scope.loginData.username == '') {
                utils.alert("Oopss...", "Please input user email");
                return;
            }

            if (utils.isValidEmailAddress($scope.loginData.username) == false) {
                utils.alert("Oopss...", "Please provide valid email");
                return;
            }

            Auth.ForgotPassword(function (data) {
                //console.log("received: ", data);
                if (data.SUCCESS) {
                    $state.go('login');
                } else {
                    utils.alert("Oopss...", data.ERROR_MSG);
                }
            });

        };

        $scope.offline = function () {
            //$scope.modal.show();
            utils.confirm("",
                "No internet connection right now? " +
                    "Enter the app using offline mode to create drafts. " +
                    "Use these drafts to send once you have internet connection",
                function (r) {
                    if (r) {

                    } else {

                    }
                }
            );
        };
        $scope.offline_close = function () {
            $scope.modal.hide();
        };
        $scope.doRegister1 = function () {
            if ($scope.regData.firstName == '') {
                utils.alert('Error', 'Please enter first name.');
                return false;
            }
            if ($scope.regData.lastName == '') {
                utils.alert('Error', 'Please enter last name.');
                return false;
            }
            if ($scope.regData.email == '') {
                utils.alert('Error', 'Please enter email address.');
                return false;
            }
            if (!utils.isValidEmailAddress($scope.regData.email)) {
                utils.alert('Error', 'Please enter email in correct format.');
                return false;
            }
            if ($scope.regData.password == '') {
                utils.alert('Error', 'Please enter password.');
                return false;
            }
            if ($scope.regData.password != $scope.regData.password1) {
                utils.alert('Error', 'Please make sure your confirm password matches.');
                return false;
            }
            $state.go('register1');
        };

        $scope.doRegister2 = function () {
            if ($scope.regData.address == '') {
                utils.alert('Error', 'Please enter address.');
                return false;
            }
            if ($scope.regData.city == '') {
                utils.alert('Error', 'Please enter city.');
                return false;
            }
            if ($scope.regData.state == '') {
                utils.alert('Error', 'Please enter state.');
                return false;
            }
            if ($scope.regData.postalcode == '') {
                utils.alert('Error', 'Please enter postal code.');
                return false;
            }
            if (!$scope.regData.agreed) {
                utils.alert('Error', 'Please agree terms & conditions.');
                return false;
            }
            Auth.Register(function (data) {
                if (!data.SUCCESS) {
                    utils.alert("Error", data.ERROR_MSG);
                } else {
                    $state.go('app.home.products');
                }

            })
        };

    })

    .controller('RegisterEditCtrl', function ($scope, $state, Auth, utils) {

        $scope.regData = Auth.fillRegData();
        $scope.countryList = Auth.getCountryList();

        $scope.editDone = function () {
            if ($scope.regData.firstName == '') {
                utils.alert('Error', 'Please enter first name.');
                return false;
            }
            if ($scope.regData.lastName == '') {
                utils.alert('Error', 'Please enter last name.');
                return false;
            }
            if ($scope.regData.email == '') {
                utils.alert('Error', 'Please enter email address.');
                return false;
            }
            if (!utils.isValidEmailAddress($scope.regData.email)) {
                utils.alert('Error', 'Please enter email in correct format.');
                return false;
            }
            if ($scope.regData.password == '') {
                utils.alert('Error', 'Please enter password.');
                return false;
            }
            if ($scope.regData.password != $scope.regData.password1) {
                utils.alert('Error', 'Please make sure your confirm password matches.');
                return false;
            }
            if ($scope.regData.address == '') {
                utils.alert('Error', 'Please enter address.');
                return false;
            }
            if ($scope.regData.city == '') {
                utils.alert('Error', 'Please enter city.');
                return false;
            }
            if ($scope.regData.state == '') {
                utils.alert('Error', 'Please enter state.');
                return false;
            }
            if ($scope.regData.postalcode == '') {
                utils.alert('Error', 'Please enter postal code.');
                return false;
            }
            if (!$scope.regData.agreed) {
                utils.alert('Error', 'Please agree terms & conditions.');
                return false;
            }

            Auth.Register(function (data) {
                if (!data.SUCCESS) {
                    utils.alert("Error", data.ERROR_MSG);
                } else {
                    $state.go('main');
                }

            });

        };

    })

    .controller('AppCtrl', function ($scope, $state, Auth, utils) {
        $scope.scanBarcode = function() {
            $state.go("product");
        }        
    })

    .controller('ProductsCtrl', function ($scope, $state, Auth, utils) {

        $scope.products = Auth.getProductTypes();
        $scope.select_item = function (key) {
            console.log("# key = " + key);
            Auth.selectProduct(key);
            //$state.go('photo-edit');
            $state.go('app.home.photos', {reload: true, notify: true});
        };
    })

    .controller('PhotosCtrl', function ($scope, $rootScope, $state, Photos) {

        $scope.socials = [
            { id: 1, name: 'Facebook', photo: 'img/social_fb.png', icon: 'ion-social-facebook' },
            { id: 3, name: 'Camera', photo: 'img/social_camera.png', icon: 'ion-camera' },
            { id: 4, name: 'Gallery', photo: 'img/social_gallery.png', icon: 'ion-images' }
        ];

        $scope.featherEditor = new Aviary.Feather({
           apiKey: 'bebd4787c0bc48789850b093a0c311f5',
           apiVersion: 3,
           theme: 'dark', // Check out our new 'light' and 'dark' themes!
           tools: 'all',
           appendTo: '',
           onSave: function(imageID, newURL) {
               var img = document.getElementById(imageID);
               img.src = newURL;
           },
           onError: function(errorObj) {
               alert(errorObj.message);
           }
       });

        $scope.launchEditor = function(id, src) {
            $scope.featherEditor.launch({
               image: id,
               url: src
           });
          return false;
        }

        $scope.select_lib = function (libtype) {
            

        };

    })

    .controller('AlbumCtrl', function ($scope, $state, Photos) {
        $scope.albums = Photos.getAlbum();
        $scope.select_album = function (album_idx) {
            console.log("# album id : " + album_idx);
            Photos.getFacbookPhotos(album_idx, function () {
                $state.go('gallery-photos');
            });
        };

    })

    .controller('GalleryCtrl', function ($scope, $rootScope, $state, Photos, Auth) {
        $scope.photos = Photos.getPhotos();
        $scope.album = Photos.getSelectedAlbum();
        $scope.noMoreItems = Photos.getPhotoNextUrl() ? false : true;
        $scope.choose_photo = function ($event) {
            var item = $event.target;
            var img_url = item.attributes['data-org'].value;

            //document.querySelector('full-photo').src = 'img/lazy-loading.gif';
            console.log('# Choose Photo : ' + img_url);
            Auth.selectPhotoUrl(img_url, function () {
                console.log('# image loading done.');
                $scope.$apply();
                $state.go('app.home.photos');
            });

        };
        $scope.loadMore = function () {
            //console.log('# load more...!');

            Photos.getPhotoMore(function (r) {
                if (r == 1) {
                    $scope.$apply();
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
                //console.log('# load done!');
            });

        };

    })

    .controller('TextCtrl', function ($scope, utils, gvars) {
        $scope.txtleft = 350;
        $scope.linesleft = 12;
        $scope.calcLength = function () {
            var cur_len = gvars.postdroid.message.length;
            $scope.txtleft = 350 - cur_len;
        };
        $scope.calcLines = function () {
            var lines = gvars.postdroid.message.split("\n");
            $scope.linesleft = 12 - lines.length;
            if (lines.length >= 12) {
                utils.alert('Error', "Message should not exceed 12 lines.");
                gvars.postdroid.message = lines.slice(0, 12);
                return;
            }
        };

        $scope.limitTextarea = function (maxLines, maxChar) {

            var cur_len = gvars.postdroid.message.length;
            $scope.txtleft = 350 - cur_len;

            var cur_lines = gvars.postdroid.message.split("\n");
            if ((12 - cur_lines.length) < 0)
                $scope.linesleft = 0;
            else
                $scope.linesleft = 12 - cur_lines.length;

            var lines = gvars.postdroid.message.replace(/\r/g, '').split('\n'), lines_removed, char_removed, i;
            if (maxLines && lines.length > maxLines) {
                lines = lines.slice(0, maxLines);
                lines_removed = 1
            }
            if (maxChar) {
                i = lines.length;
                while (i-- > 0) if (lines[i].length > maxChar) {
                    lines[i] = lines[i].slice(0, maxChar);
                    char_removed = 1
                }
                if (char_removed || lines_removed) {
                    gvars.postdroid.message = lines.join('\n')
                }
            }
            return;
        };

    })

    .controller('AddressCtrl', function ($scope, $state, $ionicViewSwitcher, utils, Auth, gvars) {

        var receiver_data = {
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'US',
            imageName: 'img/photo/person-1.jpg'
        };
        $scope.receiver = receiver_data;
        $scope.countryList = Auth.getCountryList1();
        $scope.doAddReceiver = function () {
            if (receiver_data.fname == '' || receiver_data.lname == '' || receiver_data.addr1 == '' ||
                receiver_data.addr2 == '' || receiver_data.city == '' || receiver_data.state == '' || receiver_data.country == '' || receiver_data.postalCode == '') {
                utils.alert('Error', 'Please input all fields !');
                return;
            }
            gvars.postdroid.recipients.push(utils.clone(receiver_data));
            //$ionicViewSwitcher.nextDirection('back');
            $state.go('app.home.address');
        };

        $scope.getExistReceivers = function () {
            Auth.getReceiversFromHttp(function () {
                console.log('done');
                $state.go('address-list');
            });
        };

        $scope.select_user = function (id) {
            console.log("# user id = " + id);
            var user = utils.getOneItemByAttr(gvars.appUser.recipients, 'id', id);
            gvars.postdroid.recipients.push(user);
            $state.go('app.home.address');
        };

        $scope.remove_recipient = function (index) {
            gvars.postdroid.recipients.splice(index, 1);
            $state.go('app.home.address', {reload: true, notify: true});
        };

    })

    .controller('OrderlistsCtrl', function ($scope, $state, settings, gvars, Order) {
        $scope.msg = "";

        Order.getHistory(function (data) {

            $scope.orderlists = data.AppUserOrderHistory;

        }, function (data) {

            if (data.ERROR_MSG) {
                $scope.msg = data.ERROR_MSG;
            }

        });

        $scope.datefmt = function (str) {
            var res = str.split("\n");
            var arr = res[0].split('-');
            if (arr.length > 1) {
                return moment(arr[1].trim()).format("MMMM Do YYYY");
            }
            return res;
        };

        $scope.showImage = function (userId, postdroidId) {
            gvars.postdroid.imageUrl = settings.apiUrl + "loadImageViaAppEngine/" + userId + "/" + postdroidId;
            $state.go('app.image', {reload: true, notify: true});
        };

    })

    .controller('DraftlistsCtrl', function ($scope, $state, gvars, Auth) {

        gvars.appUser.drafts.splice(0, gvars.appUser.drafts.length);
        // check if drafts exists
        Auth.getDrafts();

        $scope.select_draft = function (draft_id) {
            Auth.selectDraft(draft_id, function () {
                $state.go('app.preview');
            });
        }

        $scope.delete_draft = function (draft_id) {
            Auth.deleteDraft(draft_id, function () {
                $state.go('app.draftlist', {reload: true, notify: true});
            });
        }

    })

    .controller('BillinglistsCtrl', function ($scope, Billing) {

        $scope.msg = "";

        Billing.getHistory(function (data) {

            $scope.billinglists = data.AppUserBillingHistory;

        }, function (data) {

            if (data.ERROR_MSG) {
                $scope.msg = data.ERROR_MSG;
            }

        });

        $scope.datefmt = function (str) {
            return moment(str).format("MMMM Do YYYY");
        };
    })

    .controller('PhotoCtrl', function ($scope) {
        $scope.pinfo = {
            photo_url: 'img/photo/photo-1.jpg'
        };

    })

    .controller('PreviewCtrl', function ($scope, $state, gvars, Auth, utils) {

        $scope.sendPostDroid = function () {

            Auth.sendPostDroid(function (data) {
                utils.alert('Congratulations!',
                    'We have received your order details.You can check the status of your order via Order History in Home.Thank you for choosing us.');
                $state.go('app.home.products');
            }, function (err_msg) {
                err_msg = err_msg ? err_msg : 'Unable to send your order. Please try a  gain later.';
                utils.alert('Error', err_msg);
            });
        };

    })

    .controller('BuyPlanCtrl', function ($scope, $state, $ionicTabsDelegate, $timeout, Auth, gvars) {

        console.log("# appUser : ", gvars.appUser);

        $scope.viewInfo = {
            isGlobal: true
        };
        $scope.credits = Auth.getCreditBundles();
        $scope.creditsGlobal = Auth.getCreditBundlesGlobal();

        /*
         $timeout(function(){
         $ionicTabsDelegate.select(1);
         },0);
         */
        $scope.select_plan = function (id) {
            console.log("# id = " + id);
            $state.go('app.buy.paypal', { buyId: id });
        };

    })

    .controller('BuyPaypalCtrl', function ($scope, $state, $stateParams, gvars, Auth, utils) {
        var buyId = $stateParams.buyId;
        var date = new Date();
        var year = date.getFullYear();
        $scope.buyInfo = {
            id: buyId,
            paypal_url: '',
            isPaypal: true
        };
        $scope.cc = {
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'US',
            cardType: 'master card',
            number: '',
            expMonth: '01',
            expYear: 'year',
            cvvCode: ''
        };
        $scope.cardTypes = {
            'master card': 'Master Card',
            'visa': 'Visa',
            'american express': 'American Express',
            'discover': 'Discover'
        };
        $scope.countryList = Auth.getCountryList1();
        $scope.months = {
            "01": "01", "02": "02", "03": "03", "04": "04", "05": "05", "06": "06",
            "07": "07", "08": "08", "09": "09", "10": "10", "11": "11", "12": "12"
        };
        $scope.years = {
            'year': year, 'year + 1': year + 1, 'year + 2': year + 2, 'year + 3': year + 3, 'year + 4': year + 4, 'year + 5': year + 5,
            'year + 6': year + 6, 'year + 7': year + 7, 'year + 8': year + 8, 'year + 9': year + 9
        };

        $scope.get_buy_info = function () {
            var bundles = Auth.getCreditBundles();
            var item = utils.getOneItemByAttr(bundles, 'id', buyId);
            if (item == null) {
                var bundles = Auth.getCreditBundlesGlobal();
                var item = utils.getOneItemByAttr(bundles, 'id', buyId);
            }
            return item.description;
        };

        $scope.buy_paypal = function (id) {
            Auth.buyPaypal(id, function (data) {
                //
                if (data.SUCCESS) {
                    //$scope.buyInfo.paypal_url = data.ExpressCheckoutUrl;
                    utils.openBrowser(data.ExpressCheckoutUrl);
                }
            });
        };
        $scope.buy_creditcard = function (id) {
            Auth.buyCredit(id, $scope.cc, function (data) {
                //
                if (data.SUCCESS) {
                    //$state.go('app.home.products');
                }
            });
        };

    })

    .controller('BuyPurchasedCtrl', function ($scope, gvars, Auth, utils) {

    })

    .controller('AboutUsCtrl', function ($scope, gvars, Auth, utils, $ionicPlatform) {
        $scope.rateUs = function () {
            if ($ionicPlatform.is('ios')) {
                window.open('itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id511364723?ls=1&mt=8'); // or itms://
            } else if ($ionicPlatform.is('android')) {
                window.open('market://details?id=com.ionicframework.postdroid961725');
            }
        }
    })
