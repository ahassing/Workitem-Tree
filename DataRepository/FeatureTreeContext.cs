using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Feature_Tree.Models;
using Microsoft.IdentityModel.Protocols;

namespace Feature_Tree.DataRepository
{
    public partial class FeatureTreeContext : DbContext
    {
        public virtual DbSet<Issue> Issues { get; set; }

        public FeatureTreeContext(DbContextOptions<FeatureTreeContext> options)
    : base(options)
{ }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Issue>(entity =>
        //    {
        //        entity.Property(e => e.IssueId).IsRequired();
                
        //    });

 
        //}

    }
}
