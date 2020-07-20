using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using Killark.Data;
using Killark.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Killark.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}