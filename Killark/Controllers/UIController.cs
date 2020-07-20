using System;
using System.Threading.Tasks;
using Killark.Data;
using Killark.Request;
using Microsoft.AspNetCore.Mvc;
using ServiceProvider.Authentication;
using ServiceProvider.Contracts.Authentication;
using ServiceProvider.Contracts.Common;
using ServiceProvider.Contracts.Persistance;

namespace Killark.Controllers
{
    [ApiVersion("1.1")]
    public class UIController : Controller
    {
        public UIController()
        {
        }

        [HttpGet]
        [ActionName("sign-in")]
        public IActionResult SignIn() => View("Login");
    }
}
