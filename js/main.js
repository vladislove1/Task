$( document ).ready(function() {
    let data = {
        categories: ['newsCategory', 'notificationsCategory', 'operationsCategory', 'pollsCategory'],
        items: [
            {
                id: 1,
                category: 'newsCategory',
                active: true,
                title: 'title',
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                id: 2,
                category: 'newsCategory',
                active: true,
                title: 'title34',
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                id: 3,
                category: 'notificationsCategory',
                active: true,
                title: 'title3',
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                id: 4,
                category: 'operationsCategory',
                active: true,
                title: 'title1',
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
            {
                id: 5,
                category: 'pollsCategory',
                active: true,
                title: 'title2',
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            },
        ],
    };
    class App {
        constructor(data){
            this.data = data;
            this.notificationBell = $('#notification-bell');
            this.categories = $('.categories');
            this.notifications = $('.notifications');
            this.backBtn = $('#back-btn');
        }
        createItems = (e) => {
            let notifications = this.notifications;
            let items = this.data.items;

            for (let i = 0; i < items.length; i++) {
                if (items[i].category === e.target.id){
                    let className = items[i].active ? 'notification-item active' : 'notification-item';

                    notifications.append(`<div id="${items[i].id}" class="${className}"><h4>${items[i].title}</h4><p>${items[i].content}</p><div/>`);
                }
            }
            $('.notification-item').on('click', (e) => {
                let item =  $.grep(items, (item) => (item.id == e.currentTarget.id));

                $(e.currentTarget).removeClass('active');
                item[0].active = false;
                this.checkCountOfActiveNotificationsInCategories(item[0].category);
                this.getCountOfActiveNotifications();
            });
        };
        defineEvent = () => {
            this.notificationBell.on('click', () => {
                let block = this.categories;
                let notifications = this.notifications;

                $(".notification-item").remove();
                notifications.hide();
                block.toggle();
            });

            this.categories.on('click', (e) => {
                let notifications = this.notifications;
                let categories = this.categories;

                this.createItems(e);
                notifications.toggle();
                categories.toggle();
            });

            this.backBtn.on('click', () => {
                let notifications = this.notifications;
                let categories = this.categories;

                $(".notification-item").remove();
                notifications.hide();
                categories.show();
            });
        };
        checkCountOfActiveNotificationsInCategories = (category) => {
            let count = $.grep(this.data.items, (item) => {
                return item.active === true && item.category === category
            }).length;
            if (count === 0){
                $('#'+category).addClass('empty');
            }
        };
        getCountOfActiveNotifications = () => {
            let count = $.grep(this.data.items, (item) => (item.active)).length;

            this.notificationBell.text(count > 0 ? count : '');
        };
        start = () => {
            this.getCountOfActiveNotifications();
            this.data.categories.forEach((category) => {
                this.checkCountOfActiveNotificationsInCategories(category);
            });
            this.defineEvent();
        }
    }

    let app = new App(data);
    app.start();
});
