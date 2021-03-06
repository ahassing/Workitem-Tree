﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Feature_Tree.Models;

namespace Feature_Tree.DataRepository
{
    public partial class BTFeatureTreeContext : DbContext
    {
        public virtual DbSet<Issue> Issues { get; set; }
        public virtual DbSet<Priority> Priority { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<StatusCategory> StatusCategory { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<IssueType> IssueTypes { get; set; }

        public BTFeatureTreeContext(DbContextOptions<BTFeatureTreeContext> options)
    : base(options)
{ }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Issue>(entity =>
            {
                //entity.HasKey(e => e.IssueId)
                //    .HasName("PK_Issues");

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                //entity.Property(e => e.IssueDescription).IsRequired();

                entity.Property(e => e.IssueProjectId).HasDefaultValueSql("1");

                entity.Property(e => e.IssueTitle)
                    .IsRequired()
                    .HasMaxLength(500);

                //entity.HasOne(d => d.DependentOnNavigation)
                //    .WithMany(p => p.InverseDependentOnNavigation)
                //    .HasForeignKey(d => d.DependentOn)
                //    .HasConstraintName("FK_Issues_DependentIssue");

                entity.HasOne(d => d.IssueAssignedUser)
                    .WithMany(p => p.IssuesIssueAssignedUser)
                    .HasForeignKey(d => d.IssueAssignedUserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Issues_AssignedId");

                entity.HasOne(d => d.IssueCreatorUser)
                    .WithMany(p => p.IssuesIssueCreatorUser)
                    .HasForeignKey(d => d.IssueCreatorUserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Issues_CreatedId");

                entity.HasOne(d => d.IssueOwnerUser)
                    .WithMany(p => p.IssuesIssueOwnerUser)
                    .HasForeignKey(d => d.IssueOwnerUserId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Issues_OwnerId");

                entity.HasOne(d => d.IssuePriority)
                    .WithMany(p => p.Issues)
                    .HasForeignKey(d => d.IssuePriorityId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Issues_Priority");

                entity.HasOne(d => d.IssueProject)
                    .WithMany(p => p.Issues)
                    .HasForeignKey(d => d.IssueProjectId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Issues_ProjectId");

                entity.HasOne(d => d.IssueStatus)
                    .WithMany(p => p.Issues)
                    .HasForeignKey(d => d.IssueStatusId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Issues_StatusId");

            });

            modelBuilder.Entity<Priority>(entity =>
            {
                entity.Property(e => e.PriorityName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.ProjectId)
                    .HasName("PK_Projects");

                entity.Property(e => e.ProjectTitle)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.StatusName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.StatusCat)
                    .WithMany(p => p.Status)
                    .HasForeignKey(d => d.StatusCatId)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Status_StatusCatId");
            });

            modelBuilder.Entity<StatusCategory>(entity =>
            {
                entity.HasKey(e => e.StatusCatId)
                    .HasName("PK_StatusCategory");

                entity.Property(e => e.StatusCatName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_Users");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<IssueType>(entity =>
            {
                entity.HasKey(e => e.TypeId)
                    .HasName("PK_IssueTypes");

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}