﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feature_Tree.Models;

namespace Feature_Tree.IDataRepository
{
    public interface IPriorityRepository
    {
        IEnumerable<Priority> ListAll();
        Priority GetPriority(int priorityId);
    }
}
