// Component imports
import PeopleList from "../entities/people/PeopleList.jsx";
import LoadingScreen from "../general/Loading.jsx"

//Icon imports
import {
  Home2,
  Id,
  User,
  Settings,
  CalendarEvent,
  CurrencyEuro,
  Devices2,
  DirectionHorizontal
} from 'tabler-icons-react';

const ROUTING = {
    menuItems: [{
        name: "Home",
        system: "home",
        icon: Home2,
        children: [{
            name: "Home",
            link: "/home/",
            component: <h1> Home </h1>
        }, {
            name: "Dashboard",
            link: "/home/dashboard/",
            component: <h1> Dashboard </h1>
        }]
    }, {
        name: "Entities",
        system: "entities",
        icon: Id,
        children: [{
            name: "People",
            childSystem: "people",
            link: "/entities/people/",
            children: [{
                name: "New Person",
                link: "/entities/people/add",
                component: <h1> Add a new person </h1>
            }, {
                name: "People List",
                link: "/entities/people/list",
                component: <PeopleList />
            }]
        }, {
            name: "Organizations",
            childSystem: "organizations",
            link: "/entities/organizations/",
            children: [{
                name: "New Organization",
                link: "/entities/organization/add",
                component: <h1> Add a new organization </h1>
            }, {
                name: "OrganizationList",
                link: "/entities/organization/list",
                component: <h1> Organization List </h1>
            }]
        }, {
            name: "Groups",
            childSystem: "groups",
            link: "/entities/groups/",
            children: [{
                name: "New Group",
                link: "/entities/groups/add",
                component: <h1> Add a new group </h1>
            }, {
                name: "Group List",
                link: "/entities/groups/list",
                component: <h1> Group List </h1>
            }]
        }, {
            name: "Memos",
            childSystem: "memos",
            link: "/entities/memos/",
            children: [{
                name: "New Memo",
                link: "/entities/memos/add",
                component: <h1> Add a new memo </h1>
            }, {
                name: "Memo List",
                link: "/entities/memos/list",
                component: <h1> Memo List </h1>
            }]
        }]
    }, {
        name: "Calendar",
        system: "calendar",
        icon: CalendarEvent,
        children: [{
            name: "Calendar View",
            link: "/calendar/calendarview",
            component: <h1> Calendar view </h1>
        }, {
            name: "Tasks",
            link: "/calendar/tasks/",
            component: <h1> Tasks </h1>
        }, {
            name: "Events",
            link: "/calendar/events/",
            component: <h1> Events </h1>
        }]
    }, {
        name: "Funds",
        system: "funds",
        icon: CurrencyEuro,
        children: [{
            name: "Funds",
            link: "/funds/",
            component: <h1> Funds </h1>
        }, {
            name: "Subscriptions",
            link: "/funds/subscriptions/",
            component: <h1> Subscriptions </h1>
        }, {
            name: "Fees",
            link: "/funds/fees/",
            component: <h1> Fees </h1>
        }, {
            name: "Orders",
            link: "/funds/orders/",
            component: <h1> Orders </h1>
        }, {
            name: "Donation Reports",
            link: "/funds/donationreports/",
            component: <h1> Donation Reports </h1>
        }]
    }, {
        name: "Admin",
        system: "admin",
        icon: Devices2,
        children: [{
            name: "Admin",
            link: "/admin/",
            component: <h1> Admin </h1>
        }, {
            name: "Role Management",
            link: "/admin/rolemanagement",
            component: <h1> Funds </h1>
        }, {
            name: "User List",
            link: "/admin/userlist",
            component: <h1> Subscriptions </h1>
        }, {
            name: "Parameter List",
            link: "/admin/parameterlist/",
            component: <h1> Fees </h1>
        }, {
            name: "History",
            link: "/admin/history/",
            component: <h1> Orders </h1>
        }, {
            name: "Input",
            link: "/admin/input/",
            component: <h1> Donation Reports </h1>
        }]
    }, {
        name: "Settings",
        system: "settings",
        icon: Settings,
        children: [{
            name: "Application Settings",
            link: "/settings/application/",
            component: <h1> Settings </h1>
        }]
    }, {
        name: "Developer",
        system: "develop",
        icon: DirectionHorizontal,
        children: [{
            name: "Loading Screen",
            link: "/develop/loadingscreen/",
            component: <LoadingScreen />
        }]
    }]
}

export default ROUTING;
