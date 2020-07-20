using System;
using Microsoft.AspNetCore.Mvc;

namespace Killark.Controllers
{
    [ApiVersion("1")]
    [ApiController]
    [Route("/v{version:apiVersion}/[controller]")]
    public class HomeController : Controller
    {
        public HomeController()
        {
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Method(string str)
        {
            return str;
        }
    }
}
