using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NewToDoApp.Models;
using Newtonsoft.Json;
using System.Data.Entity.Core.Objects;

namespace NewToDoApp.Controllers
{
    public class ListController : Controller
    {
        // GET: List
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetDoneList()
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {

                var query = entities.ListDetails
                       .SqlQuery("Select * from ListDetails where status='1' order by LID desc")
                       .ToList<ListDetail>();

                return Json(query);
            }
        }

        public JsonResult GetWaitingList()
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {

                var query = entities.ListDetails
                       .SqlQuery("Select * from ListDetails where status='0' order by LID desc")
                       .ToList<ListDetail>();

                return Json(query);
            }
            
        }

        [HttpPost]
        public JsonResult InsertList(ListDetail newlist)
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {
                entities.ListDetails.Add(newlist);
                entities.SaveChanges();
                
            }

            return Json(newlist);
        }

        [HttpPost]
        public ActionResult UpdateList(ListDetail newlist)
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {
                ListDetail updatedList = (from c in entities.ListDetails
                                          where c.LID == newlist.LID
                                          select c).FirstOrDefault();
                updatedList.title = newlist.title;
                
                updatedList.date = newlist.date;
                updatedList.date = newlist.date.ToString();
               // DateTime newdate = Convert.ToDateTime(newlist.date);
                //DateTime newdate = DateTime.Parse(newlist.date);
                //updatedList.date = newdate.ToString("dddd, dd MMMM yyyy");
               

                entities.SaveChanges();
            }

            return new EmptyResult();
        }

        [HttpPost]
        public ActionResult DeleteList(int LID)
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {
                ListDetail oldlist = (from c in entities.ListDetails
                                      where c.LID == LID
                                      select c).FirstOrDefault();
                entities.ListDetails.Remove(oldlist);
                entities.SaveChanges();
            }
            return new EmptyResult();
        }

        public ActionResult UpdateDone(int LID)
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {

                ListDetail donelist = (from c in entities.ListDetails
                                      where c.LID == LID
                                      select c).FirstOrDefault();

                donelist.status = "1";
                //var query = entities.ListDetails
                      //.SqlQuery("Update ListDetails set status='1' where LID= '" + LID + "'")
                     // .ToList<ListDetail>();

                
                entities.SaveChanges();
            }
            return new EmptyResult();

        }

        public ActionResult UpdateUndo(int LID)
        {
            using (ListDetailDBEntities entities = new ListDetailDBEntities())
            {

                ListDetail donelist = (from c in entities.ListDetails
                                       where c.LID == LID
                                       select c).FirstOrDefault();

                donelist.status = "0";
                //var query = entities.ListDetails
                //.SqlQuery("Update ListDetails set status='1' where LID= '" + LID + "'")
                // .ToList<ListDetail>();


                entities.SaveChanges();
            }
            return new EmptyResult();

        }
    }
}